import React from 'react';
import GlobalStyle from './GlobalStyle';
import NavBar from './NavBar';

const Layout: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <GlobalStyle />
    <NavBar />
    <main>
      {children}
    </main>
  </>
);

export default Layout;