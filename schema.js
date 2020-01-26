import { makeExecutableSchema } from 'apollo-server-express';
export default makeExecutableSchema({
	typeDefs: [AppSchema],
	resolvers: Resolvers
});