import dotenv from 'dotenv';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { createConnection } from 'typeorm';
import MoviesAPI from './dataSources/MoviesAPI';
import resolvers from './resolvers';
import typeDefs from './graphqlSchema';

interface ApolloKoaContext {
  ctx: {
    method: string;
    url: string;
    req: Request;
    res: Response;
  }  
}

dotenv.config();

createConnection().then((connection) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        moviesAPI: new MoviesAPI(),
      };
    },
    context: ({ ctx: { req } }: ApolloKoaContext) => {
      return {
        connection,
        req,
      };
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
