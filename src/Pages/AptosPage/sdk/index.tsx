import {
  AccountData,
  GetAccountOwnedTokensQueryResponse,
  MoveModuleBytecode,
} from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssReactJson from 'src/components/css-react-json';
import ReactSeo from 'src/components/ReactSeo';
import TitleTypography from 'src/components/typography/TitleTypography';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAptosWalletContext } from 'src/wallet-connection/aptos-connection/AptosWalletContext';

export default function SDK() {
  const { t } = useLocalTranslate();
  const { connected } = useWallet();
  const { config, aptos, accountAddress } = useAptosWalletContext();
  const [fund, setFund] = useState<AccountData | undefined>(undefined);
  const [modules, setModules] = useState<Array<MoveModuleBytecode>>([]);
  const [tokens, setTokens] = useState<GetAccountOwnedTokensQueryResponse | undefined>(undefined);

  const _fetch = useCallback(async () => {
    if (aptos && accountAddress.length > 0) {
      const _fund = await aptos.getAccountInfo({ accountAddress });
      const _modules = await aptos.getAccountModules({ accountAddress });
      const _tokens = await aptos.getAccountOwnedTokens({ accountAddress });
      setFund(_fund);
      setModules(_modules);
      setTokens(_tokens);
    } else {
      setFund(undefined);
      setModules([]);
      setTokens(undefined);
    }
  }, [aptos]);

  useEffect(() => {
    _fetch();
  }, [_fetch]);

  return (
    <div>
      <ReactSeo title="My Web Practice | Aptos SDK" />
      <CssBreadcrumbs configs={[{ label: t('aptos') }]} mb={2} />
      <p className="text-[24px] text-bold">Information</p>
      <TitleTypography
        title="status"
        className="mt-[1rem] items-start"
        titleProps={{ className: 'w-[120px]' }}
      >
        <p>{connected ? 'connected' : 'disconnected'}</p>
      </TitleTypography>
      <TitleTypography
        title="Network"
        className="mt-[1rem] items-start"
        titleProps={{ className: 'w-[120px]' }}
      >
        {String(config?.network)}
      </TitleTypography>
      {fund && (
        <TitleTypography
          title="Account Fund"
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: fund }} />
        </TitleTypography>
      )}
      {modules && (
        <TitleTypography
          title="Modules"
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: modules }} />
        </TitleTypography>
      )}
      {tokens && (
        <TitleTypography
          title="Tokens"
          className="mt-[1rem] items-start"
          titleProps={{ className: 'w-[120px]' }}
        >
          <CssReactJson jsonProps={{ src: tokens }} />
        </TitleTypography>
      )}
    </div>
  );
}
