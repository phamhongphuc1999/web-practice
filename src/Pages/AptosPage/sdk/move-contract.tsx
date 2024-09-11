import { CommittedTransactionResponse } from '@aptos-labs/ts-sdk';
import { Button, TextField } from '@mui/material';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import CssReactJson from 'src/components/css-react-json';
import TitleTypography from 'src/components/typography/TitleTypography';
import { Testnet } from 'src/configs/move-contract-address';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAptosWalletContext } from 'src/wallet-connection/aptos-connection/AptosWalletContext';

export default function MoveContract() {
  const { t } = useLocalTranslate();
  const { fn, accountAddress } = useAptosWalletContext();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<CommittedTransactionResponse | undefined>(undefined);

  const _getMessage = useCallback(async () => {
    const _message = await fn.view({
      function: `${Testnet.MainContract}::message::get_message`,
      functionArguments: [accountAddress],
    });
    if (_message) {
      setMessage(String(_message[0]));
    }
  }, [fn.view]);

  useEffect(() => {
    _getMessage();
  }, [_getMessage]);

  async function _changeMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const _response = await fn.send({
        function: `${Testnet.MainContract}::message::set_message`,
        functionArguments: [message],
      });
      setResponse(_response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p className="text-[24px] text-bold">Move Contract</p>
      <TitleTypography
        title={t('message')}
        className="mt-[1rem]"
        titleProps={{ className: 'w-[120px]' }}
      >
        {message}
      </TitleTypography>
      <form onSubmit={_changeMessage}>
        <TextField onChange={(event) => setMessage(event.target.value)} />
        <Button type="submit">Change</Button>
      </form>
      {response && (
        <TitleTypography
          title={t('response')}
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: response }} />
        </TitleTypography>
      )}
    </div>
  );
}
