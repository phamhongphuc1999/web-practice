/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function SignVerifyMessage() {
  const { signMessage, signMessageAndVerify } = useWallet();
  const [message, setMessage] = useState<string>('');
  const [nonce, setNonce] = useState<string>('');
  const [signedMessage, setSignedMessage] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSignMessage() {
    setError(null);
    try {
      const response = await signMessage({ message, nonce });
      setSignedMessage(response);
    } catch (error: any) {
      setError(`Failed to sign message: ${error.message}`);
    }
  }

  async function handleVerifyMessage() {
    setError(null);
    try {
      const result = await signMessageAndVerify({ message, nonce });
      setVerificationResult(result);
    } catch (err: any) {
      setError(`Failed to verify message: ${err.message}`);
    }
  }

  return (
    <Box>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h4">Aptos Sign and Verify Message</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
        <TextField
          slotProps={{ input: { multiline: true } }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          className="rounded border p-2"
        />
        <TextField
          type="text"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          placeholder="Enter nonce (random string) here"
          className="mt-2 rounded border p-2"
        />
        <Button variant="contained" onClick={handleSignMessage}>
          Sign Message
        </Button>
        {signedMessage && (
          <div>
            <h4>Signed Message</h4>
            <pre>{JSON.stringify(signedMessage, null, 2)}</pre>
            <Button onClick={handleVerifyMessage}>Verify Message</Button>
          </div>
        )}
        {verificationResult !== null && (
          <div>
            <h4>Verification Result</h4>
            <p>{verificationResult ? 'Message is verified!' : 'Failed to verify message.'}</p>
          </div>
        )}
        {error && (
          <div className="text-red-600">
            <p>{error}</p>
          </div>
        )}
      </Box>
    </Box>
  );
}
