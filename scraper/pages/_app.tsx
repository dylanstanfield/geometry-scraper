import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';

import '../styles/globals.css';
import { ExtractProvider } from '../hooks';


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
      <ExtractProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen />
      </ExtractProvider>
    </React.Fragment>
  )
}

export default MyApp
