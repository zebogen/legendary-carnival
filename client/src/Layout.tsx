import React from 'react';
import { Normalize } from 'styled-normalize';
import GlobalStyle from './GlobalStyle';
import NavBar from './NavBar';

const Layout: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Normalize />
    <GlobalStyle />
    <NavBar />
    <main>
      {children}
    </main>
  </>
);

export default Layout;