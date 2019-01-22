import gql from 'graphql-tag';

const schema = gql`
  type MovieSearch {
    page: Int
    query: String
  }

  type Session {
    token: String
  }

  type Query {
    movieSearch: MovieSearch
    session: Session
  }

  type Mutation {
    setMovieSearch(search: String!): String
    setMovieSearchPage(page: Int!): String
    setSessionToken(token: String!): String
  }
`;

export default schema;