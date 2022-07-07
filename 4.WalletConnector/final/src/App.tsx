import './App.scss';
import { Card, CardContent } from '@mui/material';
import { useState } from 'react';


import { ConnectWallet } from './components/ConnectWallet';

import wallets from './wallets.json';
import { Wallet } from './models/Wallet';
import { Chain } from './models/Chain';


function App() {
    const [state, setState]  = useState<{
        wallet?: Wallet, 
        chain?: Chain,
    }>({});

    const handleWalletConnected = (wallet: Wallet, chain: Chain) => {
        setState({wallet, chain});
    }

    return (
        <div className="App">
            <Card className='AppBody'>
                <CardContent>
                    <ConnectWallet wallets={wallets} onWalletConnected={handleWalletConnected}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
