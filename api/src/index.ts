import dotenv from 'dotenv';
import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { createConnection, Connection } from 'typeorm';
import { User, checkPassword, hashPassword } from './entity/User';
import MoviesAPI from './dataSources/MoviesAPI';
import { generateToken, verifyToken } from './token';

dotenv.config();

const typeDefs = gql`
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
    searchMovies(query: String): MovieSearchResults
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

interface DataSources {
  moviesAPI: MoviesAPI
}

interface ResolverContext {
  connection: Connection;
  dataSources: DataSources;
}

interface FindMovieArgs {
  tmdbId: number;
}

interface SearchMoviesArgs {
  query: string;
}

interface CreateUserArgs {
  email: string;
  password: string;
}

interface CreateSessionArgs {
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    users: (_source: any, _args: any, { connection }: ResolverContext) => connection.getRepository(User).find(),
    movie: async (_source: any, { tmdbId }: FindMovieArgs, { dataSources }: ResolverContext) => dataSources.moviesAPI.findMovie(tmdbId),
    searchMovies: async (_source: any, { query }: SearchMoviesArgs, { dataSources }: ResolverContext) => dataSources.moviesAPI.searchMovies(query),
  },
  Mutation: {
    createUser: async (_source: any, { email, password }: CreateUserArgs, { connection }: ResolverContext) => {
      const user = new User();
      user.email = email;
      user.encryptedPassword = await hashPassword(password);

      const repository = connection.getRepository(User);
      await repository.save(user);
      
      console.log(user);
      return user;
    },
    createSession: async (_source: any, { email, password }: CreateSessionArgs, { connection }: ResolverContext) => {
      const user = await connection.getRepository(User).findOne({ email });
      if (!user) throw new Error('Email or password are incorrect');

      const passwordMatches = await checkPassword(password, user.encryptedPassword)
      if (!passwordMatches) throw new Error('Email or password are incorrect');
      
      return {
        token: generateToken({ email, id: user.id }),
      };
    }
  }
};

createConnection().then(async (connection) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        moviesAPI: new MoviesAPI(),
      };
    },
    context: {
      connection,
    },
    formatError: (error: any) => {
      console.log(error);
      return error;
    },
    formatResponse: (response: any) => {
      console.log(response);
      return response;
    },
  });

  const app = new Koa();

  server.applyMiddleware({ app });

  const port = 4000;
  const host = 'localhost';

  app.listen(port, host, () => {
    console.log(`🚀  Server ready at http://${host}:${port}${server.graphqlPath}`);
  });

}).catch(error => console.log(error));
