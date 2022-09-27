import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { buildSchema } from 'graphql';


const PORT = 9090;

const schema = buildSchema(` 
  type Query { 
    hello: String
  }
`);

const resolvers = {
  hello: () => "Hello world!",
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    rootValue: {
      ...resolvers,
    },
    graphiql: true //开启调试工具
  }))
);
app.listen(process.env.PORT ?? PORT);

console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
