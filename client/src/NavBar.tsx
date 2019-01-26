import React from 'react';
import styled, { css } from 'styled-components';
import { Flex, Box, Button } from 'rebass';
import Text from './components/Text';
import Heading from './components/Heading';
import { Link, NavLink } from 'react-router-dom';
import withProps from './hoc/withProps';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const GET_SESSION = gql`
  {
    session @client {
      token
    }
  }
`;

const DESTROY_SESSION = gql`
  mutation logOut {
    logOut @client
  }
`;

const NavBar: React.SFC<{}> = () => (
  <Query
    query={GET_SESSION}
  >
    {({ data: { session: { token } } }) => {
      return (
        <NavWrapper
          alignItems="stretch"
          bg="dark1"
          color="white"
          justifyContent="space-between"
        >
          <NavHeading color="white" fontSize={4} px={3}>
            FilmBFF
          </NavHeading>
          <NavLinks as="nav" alignItems="stretch">
            {!!token
              ? (
                <Mutation mutation={DESTROY_SESSION}>
                  {(logOut, { loading: logOutLoading }) => {
                    return (
                      <NavLinkButton onClick={() => logOut()}>Sign Out</NavLinkButton>
                    );
                  }}
                </Mutation>
              )
              : <Link to="/sign-in">
                  <NavLinkText>
                    Sign In
                  </NavLinkText>
                </Link>}
          </NavLinks>
        </NavWrapper>
      );
    }}
  </Query>
);

const NavWrapper = styled(Flex)`
  height: 52px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, .2);
`;

const NavHeading = styled(Heading)`
  align-self: center;
`;

const NavLinks = styled(Flex)`
`;

const navLinkStyle = css`
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #012040;
  }
`;

const StyledNavLink = styled(Text)`
  ${navLinkStyle}
`;

const NavLinkText = withProps(StyledNavLink, { color: 'white', p: 3 });

const NavLinkButton = styled('button')`
  ${navLinkStyle}
  appearance: none;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  border: none;
`

export default NavBar;