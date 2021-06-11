import React from 'react'

import GlobalStyle from './styles/GlobalStyle'
import AppProvider from './providers'
import Routes from './routes';

function App() {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
}

export default App;
