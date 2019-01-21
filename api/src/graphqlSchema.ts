import gql from 'graphql-tag';

const schema = gql`
  type Movie {
    backdrop_path: String
    budget: Int
    genres: [Genre]
    id: ID!
    imdb_id: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String!
    revenue: Int
    runtime: Int
    status: String!
    title: String!
  }

  type Genre {
    id: ID
    name: String
  }

  type MovieSearchResults {
    page: Int
    total_results: Int
    total_pages: Int
    results: [Movie]
  }

  type User {
    id: ID
    email: String
    encryptedPassword: String
  }

  type Session {
    token: String
  }

  type Query {
    movie(tmdbId: ID): Movie
    movies: [Movie]
    searchMovies(query: String, page: Int): MovieSearchResults
    users: [User]
  }

  type Mutation {
    createUser(email: String, password: String): User
    createSession(email: String, password: String): Session
  }

  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
      encryptedPassword
    }
  }
`;

export default schema;