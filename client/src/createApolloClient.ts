import ApolloClient, { PresetConfig } from 'apollo-boost';
import gql from 'graphql-tag';

function getInitialSearch() {
  const params = new URLSearchParams(window.location.search);
  return {
    __typename: 'MovieSearch',
    query: params.get('query') || '',
    page: params.get('page') || 1,
  };
}

const defaults = {
  movieSearch: getInitialSearch(),
};

const resolvers = {
  Mutation: {
    setMovieSearch: (_: any, { search, page }: any, { cache }: any) => {
      const data = cache.writeData({
        data: {
          movieSearch: {
            __typename: 'MovieSearch',
            query: search,
            page,
          },
        },
      });
      if (window.history.pushState) {
        const params = new URLSearchParams(window.location.search);
        params.set('query', search);
        params.set('page', page);
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
  type MovieSearch {
    page: Int
    query: String
  }

  type Query {
    movieSearch: MovieSearch
  }

  type Mutation {
    setMovieSearch(search: String!, page: Int): String
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