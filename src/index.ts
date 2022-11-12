const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
import {schema} from '../modules/graphql/schema';
import {createContext} from '../types/Context'
// const prisma = new PrismaClient();

const resolvers = {
  Query: {
    getAllAnimals: async (parent, args, context) => {
      return context.prisma.animal.findMany();
    },
  },
  Mutation: {
    addAnimal: async (parent, args, context) => {
      const animal = await context.prisma.animal.create({
        data: { ...args },
      });
      return animal;
    },
  },
};

const server = new ApolloServer({
  schema,
  context: createContext,

  // typeDefs: readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  // resolvers,

  // context: {
  //   prisma,
  // },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
