import React from 'react';
import { Card, Flex } from 'rebass';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Search from '../components/Search';
import gql from 'graphql-tag';

const GET_SESSION = gql`
 {
   session @client {
     token
   }
 }
`;

const GET_USER = gql`
  {
    user {
      id
      email
    }
  }
`;

const HomePage: React.SFC<{}> = () => (
  <Flex alignItems="center" flexDirection="column">
    <Query query={GET_SESSION}>
      {({ data, error, loading }) => {
        if (loading) return 'Loading session...';
        if (error) return 'Error fetching session.';
        if (data.session.token) {
          return (
            <Query query={GET_USER}>
              {({ data: userData, loading: userLoading, error: userError }) => {
                if (userLoading) return <span>Loading</span>;
                if (userError) return <Redirect to="/sign-in" />;
                if (userData) {
                  return ( 
                    <h1>
                      Welcome back, {userData.user.email}!
                    </h1>
                  );
                }
                return null;
              }}
            </Query>
          )
        } else {
          return <Redirect to="/sign-in" />
        }
      }}
    </Query>
    <Search />
  </Flex>
);

export default HomePage;