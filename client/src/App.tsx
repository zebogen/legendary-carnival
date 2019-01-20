import React, { Component } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Flex } from 'rebass';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createApolloClient from './createApolloClient';
import Search from './components/Search';
import theme from './theme';

const client = createApolloClient();

interface ThemedComponentProps {
  theme: {
    colors: any;
    fonts: any;
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: ThemedComponentProps) => props.theme.colors.light1};
    margin: 0;
    
    font-family: system-ui, sans-serif;
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <>
              <GlobalStyle />
              <Route
                path="/"
                exact
              >
                {() => (
                  <Flex alignItems="center" flexDirection="column">
                    <Search />
                  </Flex>
                )}
              </Route>
            </>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
