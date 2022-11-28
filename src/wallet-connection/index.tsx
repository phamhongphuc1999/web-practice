import { ethers } from 'ethers';
import { ConnectionInfo } from 'ethers/lib/utils';
import { LS } from 'src/configs/constance';
import { CHAINS, CHAIN_ALIASES } from 'src/configs/networkConfig';

let web3Reader: ethers.providers.JsonRpcProvider | null;
let web3Sender: ethers.providers.JsonRpcProvider | null;

export function getConnectedWallet() {
  return window.localStorage.getItem(LS.CONNECTOR);
}

export function setConnectedWallet(wallet: string | undefined) {
  if (!wallet) window.localStorage.removeItem(LS.CONNECTOR);
  else window.localStorage.setItem(LS.CONNECTOR, wallet);
}

export function getChainId() {
  const chainId = window.localStorage.getItem(LS.CHAIN_ID);
  return chainId ?? CHAIN_ALIASES.BSC_MAINNET;
}

export function setChainId(chainId: string) {
  window.localStorage.setItem(LS.CHAIN_ID, chainId);
}

export async function setWeb3Reader(chainId: number) {
  if (!chainId) chainId = Number(getChainId());
  const chain = CHAINS[chainId];
  const promises = chain.urls.map(async (rpc) => {
    const web3 = new ethers.providers.JsonRpcProvider(rpc);
    await web3.getBlockNumber();
    return web3;
  });
  web3Reader = await Promise.any(promises);
}

export function setWeb3Sender(provider: ConnectionInfo | string) {
  if (!provider) web3Sender = null;
  else web3Sender = new ethers.providers.JsonRpcProvider(provider);
}

export { web3Reader, web3Sender };
