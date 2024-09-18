import {
  AccountData,
  GetAccountOwnedTokensQueryResponse,
  MoveModuleBytecode,
  MoveResource,
} from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import CssReactJson from 'src/components/css-react-json';
import TitleTypography from 'src/components/typography/TitleTypography';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAptosWalletContext } from 'src/wallet-connection/aptos-connection/AptosWalletContext';

export default function Information() {
  const { t } = useLocalTranslate();
  const { connected } = useWallet();
  const { config, aptos, accountAddress } = useAptosWalletContext();
  const [info, setInfo] = useState<AccountData | undefined>(undefined);
  const [modules, setModules] = useState<Array<MoveModuleBytecode>>([]);
  const [tokens, setTokens] = useState<GetAccountOwnedTokensQueryResponse | undefined>(undefined);
  const [resources, setResources] = useState<Array<MoveResource>>([]);

  const _fetch = useCallback(async () => {
    if (aptos && accountAddress.length > 0) {
      const _info = await aptos.getAccountInfo({ accountAddress });
      const _modules = await aptos.getAccountModules({ accountAddress });
      const _tokens = await aptos.getAccountOwnedTokens({ accountAddress });
      const _resources = await aptos.getAccountResources({ accountAddress });
      setInfo(_info);
      setModules(_modules);
      setTokens(_tokens);
      setResources(_resources);
    } else {
      setInfo(undefined);
      setModules([]);
      setTokens(undefined);
      setResources([]);
    }
  }, [aptos]);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  return (
    <div className="mt-[2rem]">
      <p className="text-bold text-[24px]">{t('information')}</p>
      <TitleTypography
        title="status"
        className="mt-[1rem] items-start"
        titleProps={{ className: 'w-[120px]' }}
      >
        <p>{connected ? 'connected' : 'disconnected'}</p>
      </TitleTypography>
      <TitleTypography
        title={t('network')}
        className="mt-[1rem] items-start"
        titleProps={{ className: 'w-[120px]' }}
      >
        {String(config?.network)}
      </TitleTypography>
      {info && (
        <TitleTypography
          title={t('information')}
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: info, collapsed: true }} />
        </TitleTypography>
      )}
      {modules && (
        <TitleTypography
          title="Modules"
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: modules, collapsed: true }} />
        </TitleTypography>
      )}
      {tokens && (
        <TitleTypography
          title={t('tokens')}
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: tokens, collapsed: true }} />
        </TitleTypography>
      )}
      {resources && (
        <TitleTypography
          title={t('resources')}
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: resources, collapsed: true }} />
        </TitleTypography>
      )}
    </div>
  );
}
