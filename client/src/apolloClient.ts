import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const defaults = {
  movieSearch: '',
};

const resolvers = {
  Mutation: {
    setMovieSearch: (_: any, { search }: any, { cache }: any) => {
      return cache.writeData({ data: { movieSearch: search } });
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

const client = new ApolloClient({
  uri: '/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
});

export default client;