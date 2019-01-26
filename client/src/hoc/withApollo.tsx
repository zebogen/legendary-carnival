import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ApolloClient } from '../types';

interface InjectedProps {
  client: ApolloClient;
}

export default function withApollo<WrappedProps>(
  WrappedComponent: React.ComponentType<WrappedProps & InjectedProps>
) {
  return (props: any) => (
    <ApolloConsumer>
      {client => <WrappedComponent {...props} client={client} />}
    </ApolloConsumer>
  );
}