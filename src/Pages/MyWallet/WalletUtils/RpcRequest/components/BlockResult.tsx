import { Box, Typography } from '@mui/material';
import { EthBlock, EthTransaction } from 'src/packages/network-interaction/type';

interface TransactionResultProps {
  transactionData: EthTransaction | null;
}

export function TransactionResult({ transactionData }: TransactionResultProps) {
  return transactionData ? (
    <Box>
      <Typography>{`Hash: ${transactionData.hash}`}</Typography>
      <Typography>{`Type: ${transactionData.type}`}</Typography>
      <Typography>{`Nonce: ${transactionData.nonce}`}</Typography>
      <Typography>{`From: ${transactionData.from}`}</Typography>
      <Typography>{`To: ${transactionData.to}`}</Typography>
      <Typography>{`Gas: ${transactionData.gas}`}</Typography>
      <Typography>{`Value: ${transactionData.value}`}</Typography>
      <Typography>{`maxPriorityFeePerGas: ${transactionData.maxPriorityFeePerGas}`}</Typography>
      <Typography>{`maxFeePerGas: ${transactionData.maxFeePerGas}`}</Typography>
      <Typography>{`gasPrice: ${transactionData.gasPrice}`}</Typography>
      <Typography>{`chainId: ${transactionData.chainId}`}</Typography>
      <Typography>{`yParity: ${transactionData.yParity}`}</Typography>
      <Typography>{`v: ${transactionData.v}`}</Typography>
      <Typography>{`r: ${transactionData.r}`}</Typography>
      <Typography>{`s: ${transactionData.s}`}</Typography>
    </Box>
  ) : (
    <></>
  );
}

interface BlockResultProps {
  blockData: EthBlock | null;
}

export function BlockResult({ blockData }: BlockResultProps) {
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
