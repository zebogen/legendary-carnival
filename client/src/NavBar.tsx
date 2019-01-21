import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import Text from './components/Text';
import Heading from './components/Heading';
import { Link } from 'react-router-dom';

const NavBar: React.SFC<{}> = () => (
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
      <Link to="/sign-in">
        <NavLinkText color="white" p={3}>
          Sign In
        </NavLinkText>
      </Link>
    </NavLinks>
  </NavWrapper>
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

const NavLinkText = styled(Text)`
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #012040;
  }
`;

export default NavBar;