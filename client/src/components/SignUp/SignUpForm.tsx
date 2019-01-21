import React, { Component, createRef, RefObject } from 'react';
import { Box, Flex } from 'rebass';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

export default class SignUpForm extends Component<{}, {}> {
  private emailRef: RefObject<HTMLInputElement> = createRef();
  private passwordRef: RefObject<HTMLInputElement> = createRef();

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { data, loading }) => {
          if (data) {
            return <Redirect to="/sign-in" />;
          }

          return (
            <Box bg="light2">
              <form onSubmit={(e) => {
                  e.preventDefault();

                  if (this.emailRef.current && this.passwordRef.current) {
                    createUser({
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
                  {loading && <p>Signing up...</p>}
                  <button type="submit" disabled={loading}>Sign Up</button>
                </Box>
              </form>
            </Box>
          );
        }}
      </Mutation> 
    )
  }
}