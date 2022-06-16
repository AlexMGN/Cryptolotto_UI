import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification'

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const AnyComponent = Component as any;

  return (
        <>
          <Head>
            <title>Cryptolotto</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col">
              <Notifications />
              <AppBar/>
              <AnyComponent {...pageProps} />
              <Footer/>
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
