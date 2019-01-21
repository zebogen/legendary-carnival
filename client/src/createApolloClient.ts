import ApolloClient, { PresetConfig, NormalizedCacheObject } from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloCache } from 'apollo-cache';

function getInitialSearch() {
  const params = new URLSearchParams(window.location.search);
  return {
    __typename: 'MovieSearch',
    query: params.get('query') || '',
    page: params.get('page') || 1,
  };
}

interface MovieSearch {
  query?: string;
  page?: number;
}

function writeMovieSearch(cache: ApolloCache<NormalizedCacheObject>, data: MovieSearch) {
  return cache.writeData({
    data: {
      movieSearch: {
        __typename: 'MovieSearch',
        ...data,
      },
    },
  });
}

function updateClientURLParams(updateFunc: (params: URLSearchParams) => void) {
  if (window.history.pushState) {
    const params = new URLSearchParams(window.location.search);
    updateFunc(params);
    const { protocol, host, pathname } = window.location;
    const newUrl = [protocol, '//', host, pathname, `?${params.toString()}`].join('');
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
}

const defaults = {
  movieSearch: getInitialSearch(),
};

const resolvers = {
  Mutation: {
    setMovieSearch: (_: any, { search }: any, { cache }: any) => {
      const page = 1;
      const data = writeMovieSearch(cache, { query: search, page });

      updateClientURLParams(params => {
        params.set('query', search);
        params.set('page', page.toString());
      });
      
      return data;
    },
    setMovieSearchPage: (_: any, { page }: any, { cache }: any) => {
      const data = writeMovieSearch(cache, { page });

      updateClientURLParams(params => params.set('page', page));
      
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
    setMovieSearch(search: String!): String
    setMovieSearchPage(page: Int!): String
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