const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');

const animals = [
  {
    name: 'Lion',
    fact: 'During the Neolithic period, lions ranged throughout Africa, Southeast Europe, and Western and South Asia.',
  },
  {
    name: 'Goose',
  },
];

const resolvers = {
  Query: {
    getAllAnimals: () => animals,
  },
};

const server = new ApolloServer({
  typeDefs: readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
