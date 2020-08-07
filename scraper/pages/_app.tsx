import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';

import '../styles/globals.css';

import { AppProvider } from '../hooks';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <React.Fragment>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
      <ReactQueryDevtools initialIsOpen />
    </React.Fragment>
  )
}

export default MyApp
