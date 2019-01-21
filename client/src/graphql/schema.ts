import gql from 'graphql-tag';

const schema = gql`
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

export default schema;