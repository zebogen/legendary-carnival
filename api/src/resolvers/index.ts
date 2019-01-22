import { Connection } from 'typeorm';
import { User, checkPassword, hashPassword } from '../entity/User';
import { generateToken, verifyToken } from '../token';
import MoviesAPI from '../dataSources/MoviesAPI';
import { AuthorizationError } from '../errors';

interface DataSources {
  moviesAPI: MoviesAPI
}

interface ResolverContext {
  connection: Connection;
  dataSources: DataSources;
  req: {
    headers: {
      authorization?: string;
    }
  };
}

interface FindMovieArgs {
  tmdbId: number;
}

interface SearchMoviesArgs {
  query: string;
  page?: number;
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
    searchMovies: async (_source: any, { query, page }: SearchMoviesArgs, { dataSources }: ResolverContext) => dataSources.moviesAPI.searchMovies(query, page),
    user: async (_source: any, _args: any, { connection, req }: ResolverContext) => {
      const token = req.headers.authorization;
      if (!token) throw new AuthorizationError('No Authorization header included with the request');
      const { id } = await verifyToken(token);
      const user = await connection.getRepository(User).findOne({ id });
      if (!user) throw new AuthorizationError('Authorization header is invalid');
      return user;
    },
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

export default resolvers;