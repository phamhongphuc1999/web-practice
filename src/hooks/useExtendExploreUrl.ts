import { ExploreConfigProps, useExplorerUrl } from './use-explorer-url';

export default function useExtendExploreUrl(hash: string | undefined, config: ExploreConfigProps) {
  const { link, text } = useExplorerUrl(hash, { ...config });
  return { link, text };
}
