import React from 'react';
import { Flex } from 'rebass';
import Heading from '../components/Heading';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUpPage: React.SFC<{}> = () => (
  <Flex alignItems="center" flexDirection="column">
    <Heading>Sign Up</Heading>
    <SignUpForm />
  </Flex>
);

export default SignUpPage;