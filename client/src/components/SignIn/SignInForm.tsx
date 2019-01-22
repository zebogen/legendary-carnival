import React, { Component, createRef, RefObject } from 'react';
import { Box, Flex } from 'rebass';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      token
    }
  }
`;

const SET_SESSION_TOKEN = gql`
  mutation SetSessionToken($token: String!) {
    setSessionToken(token: $token) {
      token
    }
  }
`;

export default class SignInForm extends Component<{}, {}> {
  private emailRef: RefObject<HTMLInputElement> = createRef();
  private passwordRef: RefObject<HTMLInputElement> = createRef();

  render() {
    return (
      <Mutation
        mutation={SET_SESSION_TOKEN}
      >
        {(setSessionToken, { called: setSessionTokenCalled, loading: setSessionTokenLoading }) => (  
          <Mutation mutation={CREATE_SESSION}>
            {(createSession, { data, loading }) => {
              if (data && data.createSession.token) {
                if (!setSessionTokenCalled) {
                  setSessionToken({ variables: { token: data.createSession.token } });
                } else if (setSessionTokenLoading) {
                  return 'Setting session token...';
                } else {
                  return <Redirect to="/" />;
                }
              }

              return (
                <Box bg="light2">
                  <form onSubmit={(e) => {
                      e.preventDefault();

                      if (this.emailRef.current && this.passwordRef.current) {
                        createSession({
                          variables: {
                            email: this.emailRef.current.value,
                            password: this.passwordRef.current.value,
                          },
                        });
                      }
                    }
                  }>
                    <Box>
                      <label htmlFor="email">
                        Email 
                      </label>
                      <input type="email" ref={this.emailRef} />
                    </Box>
                    <Box>
                      <label htmlFor="password">
                        Password
                      </label>
                      <input type="password" ref={this.passwordRef} />
                    </Box>
                    <Box>
                      {loading && <p>Signing in...</p>}
                      <button type="submit" disabled={loading}>Sign In</button>
                    </Box>
                  </form>
                </Box>
              );
            }}
          </Mutation> 
        )}
      </Mutation>
    )
  }
}