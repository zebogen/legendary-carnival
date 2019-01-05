import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { createConnection, Connection } from 'typeorm';
import { User } from './entity/User';
import MoviesAPI from './dataSources/MoviesAPI';

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
  }

  type Query {
    movie(tmdbId: ID): Movie
    movies: [Movie]
    searchMovies(query: String): MovieSearchResults
    users: [User]
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

const resolvers = {
  Query: {
    users: (_source: any, _args: any, { connection }: ResolverContext) => connection.getRepository(User).find(),
    movie: async (_source: any, { tmdbId }: FindMovieArgs, { dataSources }: ResolverContext) => dataSources.moviesAPI.findMovie(tmdbId),
    searchMovies: async (_source: any, { query }: SearchMoviesArgs, { dataSources }: ResolverContext) => dataSources.moviesAPI.searchMovies(query),
  },
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
  });

  const app = new Koa();

  server.applyMiddleware({ app });

  const port = 4000;
  const host = 'localhost';

  app.listen(port, host, () => {
    console.log(`🚀  Server ready at http://${host}:${port}${server.graphqlPath}`);
  });

}).catch(error => console.log(error));
