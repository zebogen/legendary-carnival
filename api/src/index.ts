import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { createConnection, Connection } from 'typeorm';
import { User } from './entity/User';

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
  }

  type User {
    id: ID
    email: String
  }

  type Query {
    movies: [Movie]
    users: [User]
  }
`;

interface ResolverContext {
  connection: Connection;
}

const resolvers = {
  Query: {
    users: (_source: any, _args: any, { connection }: ResolverContext) => connection.getRepository(User).find(),
  },
};

createConnection().then(async (connection) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
