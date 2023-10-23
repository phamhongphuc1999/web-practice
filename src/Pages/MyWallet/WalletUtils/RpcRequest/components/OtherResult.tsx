import { Box, Typography } from '@mui/material';
import { SyncingObject, SyncingType } from '@peter-present/user-operation-type';

interface AccountsResultProps {
  accounts: Array<string>;
}

export function AccountsResult({ accounts }: AccountsResultProps) {
  return (
    <Box>
      {accounts.map((account, _) => {
        return <Typography key={account}>{account}</Typography>;
      })}
    </Box>
  );
}

interface SyncingResultProps {
  data: SyncingType | null;
}

export function SyncingResult({ data }: SyncingResultProps) {
  const dataObject = data as SyncingObject;

  return (
    <Box>
      {dataObject ? (
        <Box>
          <Typography>{`Starting block: ${dataObject.startingBlock}`}</Typography>
          <Typography>{`Current block: ${dataObject.currentBlock}`}</Typography>
          <Typography>{`Highest block: ${dataObject.highestBlock}`}</Typography>
        </Box>
      ) : (
        <Typography>{data?.toString()}</Typography>
      )}
    </Box>
  );
}
