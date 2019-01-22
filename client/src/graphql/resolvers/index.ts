import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import TokenStorage from '../../util/TokenStorage';

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
    setSessionToken: (_: any, { token }: any, { cache }: any) => {
      TokenStorage.set(token);

      return cache.writeData({
        data: {
          session: {
            __typename: 'Session',
            token,
          },
        },
      })
    },
  },
};

export default resolvers;