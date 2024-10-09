'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export function WalletConnectButton() {
  const { publicKey } = useWallet();

  return (
    <WalletMultiButton className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
      {publicKey ? 'Connected' : 'Connect Wallet'}
    </WalletMultiButton>
  );
}
