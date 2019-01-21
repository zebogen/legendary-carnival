import ApolloClient, { PresetConfig, NormalizedCacheObject } from 'apollo-boost';
import resolvers from './resolvers';
import typeDefs from './schema';

function getInitialSearch() {
  const params = new URLSearchParams(window.location.search);
  return {
    __typename: 'MovieSearch',
    query: params.get('query') || '',
    page: params.get('page') || '1',
  };
}

const defaults = {
  movieSearch: getInitialSearch(),
};

export default function createClient(options: PresetConfig = {}) {
  return new ApolloClient({
    uri: '/graphql',
    clientState: {
      defaults,
      resolvers,
      typeDefs,
    },
    ...options,
  });
}