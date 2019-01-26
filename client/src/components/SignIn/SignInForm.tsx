import React, { Component, createRef, RefObject } from 'react';
import { Box, Flex } from 'rebass';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';
import { ApolloClient } from '../../types';
import withApollo from '../../hoc/withApollo';
import TokenStorage from '../../util/TokenStorage';
import Button from '../Button';
import styled from 'styled-components';

const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      token
    }
  }
`;

class SignInForm extends Component<{ client: ApolloClient }, {}> {
  private emailRef: RefObject<HTMLInputElement> = createRef();
  private passwordRef: RefObject<HTMLInputElement> = createRef();

  render() {
    return (
      <Mutation
        mutation={CREATE_SESSION}
        update={(cache, { data: { createSession: { token } } }) => {
          TokenStorage.set(token);

          return cache.writeData({
            data: {
              session: {
                __typename: 'Session',
                token,
              },
            },
          })
        }}
      >
        {(createSession, { data, loading }) => {
          if (data && data.createSession.token) {
            return <Redirect to="/" />;
          }

          return (
            <Box mb={3}>
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
                <Box mb={2}>
                  <Label htmlFor="email">
                    Email 
                  </Label>
                  <Input type="email" placeholder="Your email address" ref={this.emailRef} />
                </Box>
                <Box mb={2}>
                  <Label htmlFor="password">
                    Password
                  </Label>
                  <Input type="password" placeholder="Your password" ref={this.passwordRef} />
                </Box>
                <ButtonContainer>
                  {loading && <p>Signing in...</p>}
                  <Button type="submit" disabled={loading}>Sign In</Button>
                </ButtonContainer>
              </form>
            </Box>
          );
        }}
      </Mutation>
    );
  }
}

const Label = styled.label`
  display: block;
  font-family: ${props => props.theme.fonts.sans};
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  font-family: ${props => props.theme.fonts.sans};
  padding: 8px;
  font-size: 16px;
`;

const ButtonContainer = styled(Box)`
  text-align: center;
`;

export default withApollo(SignInForm);