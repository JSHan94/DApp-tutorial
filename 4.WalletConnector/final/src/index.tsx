import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { MetaMaskProvider } from "metamask-react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2b32b2',
        },
    },
});

// MetaMaskProvider로 App을 Wrapping 하여 provider 이하의 리액트 child들에서 MetaMask를 사용할 수 있게함
// SnackbarProvider 정상적으로 연결되는지 등을 확인할 notistack을 이용함
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <SnackbarProvider
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
                <MetaMaskProvider>
                        <App />
                </MetaMaskProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>
);
