import { Network } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Divider, Typography } from '@mui/material';

export default function ChangeNetwork() {
  const { network, changeNetwork, wallet } = useWallet();
  const isNetworkChangeSupported = wallet?.name === 'Nightly';

  function isValidNetworkName() {
    return network && Object.values<string>(Network).includes(network.name);
  }

  return (
    <Box>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h4">Network Info</Typography>
      <div>
        <div>
          <strong>Network name</strong>
        </div>
        <div>
          <span style={{ color: isValidNetworkName() ? 'green' : 'red' }}>
            {network?.name ?? 'Not Present'}
          </span>
          {` (Expected: ${Object.values<string>(Network).join(', ')})`}
        </div>
        <div>
          <strong>URL</strong>
        </div>
        <div>
          {network?.url ? (
            <a href={network.url} target="_blank" rel="noreferrer">
              {network.url}
            </a>
          ) : (
            'Not Present'
          )}
        </div>
        <div>
          <strong>Chain ID</strong>
        </div>
        <div>{network?.chainId ?? 'Not Present'}</div>
      </div>
      <div>
        <h4>Change Network</h4>
        <div>
          <label>
            <input
              type="radio"
              name="network"
              value={Network.DEVNET}
              checked={network?.name === Network.DEVNET}
              onChange={() => changeNetwork(Network.DEVNET)}
              disabled={!isNetworkChangeSupported}
            />
            Devnet
          </label>
          <label>
            <input
              type="radio"
              name="network"
              value={Network.TESTNET}
              checked={network?.name === Network.TESTNET}
              onChange={() => changeNetwork(Network.TESTNET)}
              disabled={!isNetworkChangeSupported}
            />
            Testnet
          </label>
          <label>
            <input
              type="radio"
              name="network"
              value={Network.MAINNET}
              checked={network?.name === Network.MAINNET}
              onChange={() => changeNetwork(Network.MAINNET)}
              disabled={!isNetworkChangeSupported}
            />
            Mainnet
          </label>
        </div>
        {!isNetworkChangeSupported && (
          <div>* {wallet?.name ?? 'This wallet'} does not support network change requests</div>
        )}
      </div>
    </Box>
  );
}
