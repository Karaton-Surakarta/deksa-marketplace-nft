import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, Chain } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

const BaseSepolia: Chain = {
  id: 84532,
  name: "Base Sepolia",
  network: "base-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: "https://sepolia.base.org/",
    default: "https://sepolia.base.org/",
  },
  blockExplorers: {
    default: {
      name: "Soneium Explorer",
      url: "https://sepolia-explorer.base.org/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  // [soneiumMinato],
  [BaseSepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_POLYGON_RPC_API_URL || "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {(() => {
          const AnyComponent = Component as any;
          return <AnyComponent {...pageProps} />;
        })()}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;