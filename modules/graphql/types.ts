import { booleanArg, extendType, nonNull,objectType ,queryType,mutationType} from "nexus";

export const testQuery = extendType({
  type: "Query",
  definition: t => {
    t.boolean("test", {
      args: { bool: nonNull(booleanArg()) },
      resolve: (_, { bool }) => bool,
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneCompany();
  },
});