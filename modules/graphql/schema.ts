import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';

import { join } from 'path';
import * as types from './types';

const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: "prisma",
      }
    ]
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  contextType: {
    module: join(process.cwd(), './types/Context.ts'),
    export: 'Context',
  },
  outputs: {
    schema: join(process.cwd(), './generated/schema.graphql'),
    typegen: join(process.cwd(), './generated/nexus-typegen.d.ts'),
  },
});

export { schema };
