import { Box, Typography } from '@mui/material';
import { EthBlock } from 'src/packages/network-interaction/network-interaction';

interface Props {
  blockData: EthBlock | null;
}

export default function BlockResult({ blockData }: Props) {
  return blockData ? (
    <Box>
      <Typography>{`Difficulty: ${blockData.difficulty}`}</Typography>
      <Typography>{`ExtraData: ${blockData.extraData.slice(0, 20)}...`}</Typography>
      <Typography>{`GasLimit: ${blockData.gasLimit}`}</Typography>
      <Typography>{`GasUsed: ${blockData.gasUsed}`}</Typography>
      <Typography>{`Hash: ${blockData.hash}`}</Typography>
      <Typography>{`LogsBloom: ${blockData.logsBloom.slice(0, 20)}...`}</Typography>
      <Typography>{`Miner: ${blockData.miner}`}</Typography>
      <Typography>{`MixHash: ${blockData.mixHash}`}</Typography>
      <Typography>{`Nonce: ${blockData.nonce}`}</Typography>
      <Typography>{`Number: ${blockData.number}`}</Typography>
      <Typography>{`ParentHash: ${blockData.parentHash}`}</Typography>
      <Typography>{`ReceiptsRoot: ${blockData.receiptsRoot}`}</Typography>
      <Typography>{`Size: ${blockData.size}`}</Typography>
      <Typography>{`StateRoot: ${blockData.stateRoot}`}</Typography>
      <Typography>{`Timestamp: ${blockData.timestamp}`}</Typography>
      <Typography>{`TotalDifficulty: ${blockData.totalDifficulty}`}</Typography>
      <Typography>{`TransactionsRoot: ${blockData.transactionsRoot}`}</Typography>
      <Typography>{`Transaction: ${blockData.transactions.length} transactions`}</Typography>
    </Box>
  ) : (
    <></>
  );
}
