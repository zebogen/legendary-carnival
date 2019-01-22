import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import resolvers from './resolvers';
import typeDefs from './schema';
import TokenStorage from '../util/TokenStorage';

function getInitialSearch() {
  const params = new URLSearchParams(window.location.search);
  return {
    __typename: 'MovieSearch',
    query: params.get('query') || '',
    page: params.get('page') || '1',
  };
}

function getInitialSession() {
  const token = TokenStorage.get() || '';

  return {
    __typename: 'Session',
    token,
  };
}

const authLink = new ApolloLink((operation, forward) => {
  const token = TokenStorage.get();

  operation.setContext(({ headers }: any) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }));

  return forward ? forward(operation) : null;
});

const defaults = {
  movieSearch: getInitialSearch(),
  session: getInitialSession(),
};

export default function createClient() {
  const cache = new InMemoryCache();

  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      authLink,
      withClientState({ cache, defaults, resolvers, typeDefs }),
      new HttpLink({ uri: '/graphql' }),
    ]),
  });
}