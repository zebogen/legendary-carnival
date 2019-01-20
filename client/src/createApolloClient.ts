import ApolloClient, { PresetConfig } from 'apollo-boost';
import gql from 'graphql-tag';

function getInitialSearch() {
  const params = new URLSearchParams(window.location.search);
  return params.get('query') || '';
}

const defaults = {
  movieSearch: getInitialSearch(),
};

const resolvers = {
  Mutation: {
    setMovieSearch: (_: any, { search }: any, { cache }: any) => {
      const data = cache.writeData({ data: { movieSearch: search } });
      if (window.history.pushState) {
        const params = new URLSearchParams(window.location.search);
        params.set('query', search);
        const { protocol, host, pathname } = window.location;
        const newUrl = [protocol, '//', host, pathname, `?${params.toString()}`].join('');
        console.log('pushing newUrl', newUrl);
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      return data;
    },
  },
};

const typeDefs = gql`
  type Query {
    movieSearch: String
  }

  type Mutation {
    setMovieSearch(search: String!): String
  }
`;

export default function createApolloClient(options: PresetConfig = {}) {
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