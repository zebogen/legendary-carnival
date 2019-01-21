import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createApolloClient from './createApolloClient';
import theme from './theme';
import Layout from './Layout';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

const client = createApolloClient();

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <Route
                path="/"
                exact
                render={() => <HomePage />}
              />
              <Route
                path="/sign-in"
                render={() => <SignInPage />}
              />
              <Route
                path="/sign-up"
                render={() => <SignUpPage />}
              />
            </Layout>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
