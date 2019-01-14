import React, { Component } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Flex } from 'rebass';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apolloClient';
import Search from './components/Search';

const theme = {
  colors: {
    black: '#222222',
    dark1: '#001326',
    dark2: '#131326',
    dark3: '#001326',
    blue1: '#3174b8',
    blue2: '#044e7c',
    darkBlue: '#000700',
    iconBlue: '#00faea',
  },
  fonts: {
    sans: 'system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
};

interface ThemedComponentProps {
  theme: {
    colors: any;
    fonts: any;
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: ThemedComponentProps) => props.theme.colors.blue1};
    
    font-family: system-ui, sans-serif;
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Flex alignItems="center" flexDirection="column">
              <Search />
            </Flex>
          </>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
