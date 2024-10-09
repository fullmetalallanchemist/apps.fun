import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function HomeContent() {
  return (
    <main>
      <h1>Welcome to Solana Wallet App</h1>
      <WalletMultiButton />
    </main>
  );
}