import React from 'react';
import { Flex } from 'rebass';
import Search from '../components/Search';

const HomePage: React.SFC<{}> = () => (
  <Flex alignItems="center" flexDirection="column">
    <Search />
  </Flex>
);

export default HomePage;