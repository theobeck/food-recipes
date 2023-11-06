import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Mongoose from 'mongoose';
import resolvers from './resolvers.js';
import { typeDefs } from '../src/schema.js';

// Mongoose
const databaseName = 'RecipeList'; // Replace with your desired database name

Mongoose.connect(`mongodb://it2810-13.idi.ntnu.no:27017/${databaseName}`);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
