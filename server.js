import Schema from './graphql/schema';
const apolloServer = new ApolloServer({
  schema:Schema,
  playground: true,
  context: ({ req }) => ({
    user: req.user,
  }),
})