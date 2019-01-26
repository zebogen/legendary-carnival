import React from 'react';
import { Flex } from 'rebass';
import Heading from '../components/Heading';
import Text from '../components/Text';
import SignInForm from '../components/SignIn/SignInForm';
import { Link } from 'react-router-dom';

const SignInPage: React.SFC<{}> = () => (
  <Flex alignItems="center" flexDirection="column">
    <Heading fontSize={5} my={3}>Sign In</Heading>
    <SignInForm />
    <Text>
      Need an account? <Link to="/sign-up">Sign up here.</Link>
    </Text>
  </Flex>
);

export default SignInPage;