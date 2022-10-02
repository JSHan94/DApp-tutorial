import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import useWallets from '../../hooks/useWallets';
import { Chain } from '../../models/Chain';
import { Wallet } from '../../models/Wallet';
import './ConnectWallet.scss'

export type ConnectWalletType = {
    wallets: Array<Wallet>,
    onWalletConnected: (wallet: Wallet, chain: Chain) => void
}


export const ConnectWallet = (props: ConnectWalletType) => {
    const {
        wallets,
        onWalletConnected
    } = props;

    const [wallet, setWallet] = useState<Wallet | null>();
    const [walletId, setWalletId] = useState('');
    const [chains, setChains] = useState(new Array<Chain>());
    const [chain, setChain] = useState<Chain | null>();
    const [chainId, setChainId] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    
    const [walletInstalled, setWalletInstalled] = useState<boolean>();

    const { enqueueSnackbar } = useSnackbar();
    const {
        isInstalled,
        isConnected,
        connect,
        getAddress,
        getBalance
    } = useWallets();



    const handleSelectWallet = (event: any) => {
        const selectedWallet = wallets.find(wallet => wallet.id === event.target.value);
        setChain(null);
        setChainId("");
        setChains([]);

        if (selectedWallet) {
            setWalletId(event.target.value);
            setWallet(selectedWallet);
            setChains(selectedWallet.chains);

            const firstChain = selectedWallet.chains[0];
            if(selectedWallet.chains.length === 1) {
                setChain(firstChain);
                setChainId(firstChain.id);
            }

            const walletInstalled = isInstalled(selectedWallet);
            setWalletInstalled(walletInstalled);
        }
    };

    const handleSelectChain = (event: any) => {
        const selectedChain = chains.find(chain => chain.id === event.target.value);

        if (wallet) {
            setChainId(event.target.value);
            setChain(selectedChain);

            if (isConnected(wallet) && selectedChain) {
                onWalletConnected(wallet, selectedChain)
            }
        }
    };

    const handleConnectWallet = async () => {
        try {
            if (wallet && chain) {
                await connect(wallet, chain);

                onWalletConnected(wallet, chain);
                enqueueSnackbar("Operation success", { variant: "success" });
                const _address = await getAddress(wallet,chain)
                setAddress(_address);
                const _balance = await getBalance(wallet,_address)
                setBalance(_balance)
            }
        }
        catch (e) {
            console.log(e);
            enqueueSnackbar("Operation cancelled", { variant: "error" });
        }
    }

    const handleCleanSelections = () => {
        setWallet(null);
        setWalletId('');
        setChain(null);
        setChainId('');
        setChains([]);
        setAddress('');
        setBalance('');
        setWalletInstalled(false);
    }

    return (
        <div className='ConnectWallet'>
            <h4> Wallet Connector </h4>
            <Box id='AddressBox'>{address}</Box>
            { wallet?.id === 'metamask' && <Box id='TokenBox'>{balance} eth</Box>}
            { wallet?.id === 'keplr' && <Box id='TokenBox'>{balance} atom</Box>}
            { wallet?.id === 'phantom' && <Box id='TokenBox'>{balance} sol</Box>}
            <FormControl className='FormControl' fullWidth>
                <InputLabel>Select Wallet</InputLabel>
                <Select
                    id='WalletDropdown'
                    labelId='Wallet'
                    value={walletId}
                    label='Select Wallet'
                    onChange={handleSelectWallet}>
                    {wallets.map((wallet, index) => (
                        <MenuItem
                            className='DropdownItem'
                            key={index}
                            value={wallet.id}>
                            <div className={'icon ' + wallet.icon} />
                            <span>{wallet.name}</span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {wallet && !walletInstalled
                && <Alert severity="info" onClose={() => handleCleanSelections()}>Install {wallet.name} to connect to select a chain</Alert>}
            {wallet && walletInstalled && <FormControl className='FormControl' fullWidth>

                <InputLabel>Origin Chain</InputLabel>
                <Select
                    id='OriginChainDropdown'
                    labelId='OriginChainDropdown'
                    value={chainId}
                    label='Origin Chain'
                    onChange={handleSelectChain}>
                    {chains.map((chain, index) => (
                        <MenuItem
                            className='DropdownItem'
                            key={index}
                            value={chain.id}>
                            <div className={'icon ' + chain.icon} />
                            <span>{chain.name}</span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>}
            {wallet && chain && isInstalled(wallet) && <div className='ConnectWalletFooter'>
                <Button variant='contained'
                    fullWidth
                    onClick={() => handleConnectWallet()}>
                    Use {wallet.name} with {chain?.name}
                </Button>
            </div>
            }
        </div>
    )
}
