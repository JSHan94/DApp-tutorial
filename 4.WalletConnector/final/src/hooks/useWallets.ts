import { useMetaMask } from "metamask-react";
import { Wallet } from "../models/Wallet";
import { Chain, KeplrChain } from "../models/Chain";
import Web3 from 'web3';

const useWallets = () => {
    const metamask = useMetaMask();
    const _window: any = window;

    const isInstalled = (wallet: Wallet): boolean => {
        switch (wallet.id) {
            case "keplr":
                return _window.keplr !== undefined;
            case "metamask":
                return metamask.status !== "unavailable";
            case "phantom":
                return _window.solana?.isPhantom;
            default:
                throw Error(`Unknown wallet with id '${wallet.id}'`);
        }
    }

    const getPhantomProvider = () => {
        if ('phantom' in _window) {
          const provider = _window.phantom?.solana;
      
          if (provider?.isPhantom) {
            return provider;
          }
        }
      
        window.open('https://phantom.app/', '_blank');
      };


    const isConnected = (wallet: Wallet): boolean => {
        switch (wallet.id) {
            case "keplr":
                return false;
            case "metamask":
                return metamask.status === "connected";
            case "phantom":
                return _window.solana.isConnected;
            default:
                throw Error(`Unknown wallet with id '${wallet.id}'`);
        }
    }

    const connect = async (wallet: Wallet, chain: Chain): Promise<any> => {
        switch (wallet.id) {
            case "keplr":
                return _connectKeplrWallet(chain as KeplrChain);
            case "metamask":
                return metamask.connect();
            case "phantom":
                return _window.solana?.connect();
            default:
                throw Error(`Unknown wallet with id '${wallet.id}'`);
        }
    }

    const _connectKeplrWallet = async (chain: KeplrChain): Promise<any> => {
        return _window.keplr.enable(chain.keplrChainId);
    }

    const getAddress = async (wallet: Wallet, chain?: Chain): Promise<string> => {
        switch (wallet.id) {
            case "keplr":
                const keplrChainId = (chain as KeplrChain).keplrChainId;
                const offlineSigner = _window.getOfflineSigner(keplrChainId);
                const accounts = await offlineSigner.getAccounts();
                return accounts[0].address;
            case "metamask":
                return metamask.account as string;
            case "phantom":
                return _window.solana?.publicKey.toString();
            default:
                throw Error(`Unknown wallet with id '${wallet.id}'`);
        }
    }

    const getBalance = async (wallet: Wallet, address:string): Promise<string> => {
        let balance = "";
        switch (wallet.id) {
            case "metamask":
                const web3 = new Web3(_window.ethereum);
                balance = (await web3.eth.getBalance(address))
                // balance string to number
                balance = web3.utils.fromWei(balance, 'ether');
                return balance
            // 이 부분에 phantom, keplr 등 각 지갑에서 지원하는 코인을 잔고 확인을 추가하시면 됩니다
            case "keplr":
                return "0"
            case "phantom":
                return "0"
            default:
                throw Error(`Unknown wallet with id '${wallet.id}'`);
        }
    }

    return {
        isInstalled,
        isConnected,
        connect,
        getAddress,
        getBalance
    }
}

export default useWallets;