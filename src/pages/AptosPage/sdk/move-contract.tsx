import { CommittedTransactionResponse } from '@aptos-labs/ts-sdk';
import { Button, TextField } from '@mui/material';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CssReactJson from 'src/components/css-react-json';
import TitleTypography from 'src/components/typography/TitleTypography';
import { Testnet } from 'src/configs/move-contract-address';
import { TasksListType, TaskType } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAptosWalletContext } from 'src/WalletConnection/aptos-connection/AptosWalletContext';

export default function MoveContract() {
  const { t } = useLocalTranslate();
  const { fn, accountAddress } = useAptosWalletContext();
  const { view } = fn;
  const [contractMessage, setContractMessage] = useState('');
  const [contractTasks, setContractTasks] = useState<TasksListType | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<CommittedTransactionResponse | undefined>(undefined);

  const _getMessage = useCallback(async () => {
    const _message = await view<Array<string>>({
      packageName: Testnet.MainContract,
      module: 'message',
      functionName: 'get_message',
      functionArguments: [accountAddress],
    });
    if (_message) setContractMessage(_message[0]);
  }, [view, accountAddress]);

  const _getTasks = useCallback(async () => {
    const _counter = await view<Array<number>>({
      packageName: Testnet.MainContract,
      module: 'message',
      functionName: 'get_task_counter',
      functionArguments: [accountAddress],
    });
    if (_counter) {
      const awaitFn: Array<Promise<TaskType[] | undefined>> = [];
      for (let i = 1; i <= _counter[0]; i++) {
        awaitFn.push(
          view<Array<TaskType>>({
            packageName: Testnet.MainContract,
            module: 'message',
            functionName: 'get_task',
            functionArguments: [accountAddress, i],
          })
        );
      }
      const _contractTasks: TasksListType = {};
      const tasks = await Promise.all(awaitFn);
      for (const _task of tasks) {
        if (_task) _contractTasks[_task[0].task_id] = _task[0];
      }
      setContractTasks(_contractTasks);
    }
  }, [view, accountAddress]);

  useEffect(() => {
    _getMessage();
    _getTasks();
  }, [_getMessage, _getTasks]);

  async function _changeMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const _response = await fn.send({
        packageName: Testnet.MainContract,
        module: 'message',
        functionName: 'set_message',
        functionArguments: [message],
      });
      setResponse(_response);
      if (_response?.success) {
        setMessage('');
        setContractMessage(message);
        toast.success('Change message successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p className="text-bold text-[24px]">Move Contract</p>
      <TitleTypography
        title={t('message')}
        className="mt-[1rem]"
        titleProps={{ className: 'w-[120px]' }}
      >
        {contractMessage}
      </TitleTypography>
      <form onSubmit={_changeMessage} className="mt-[1rem]">
        <TextField size="small" onChange={(event) => setMessage(event.target.value)} />
        <Button type="submit" color="primary" variant="contained">
          Change
        </Button>
      </form>
      {contractTasks && (
        <TitleTypography
          title="Tasks"
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: contractTasks, collapsed: true }} />
        </TitleTypography>
      )}
      {response && (
        <TitleTypography
          title={t('response')}
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: response, collapsed: true }} />
        </TitleTypography>
      )}
    </div>
  );
}
