import { loadSchemaSync } from "@graphql-tools/load";
import { TDuelLogMapper } from "./src/dao/TDuelLogMapper";
import { startStandaloneServer } from "@apollo/server/standalone";

import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./src/types/generated/graphql";

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    getDuelLogs() {
      return TDuelLogMapper.selectAll();
    },
    getDuelLog(parent, args, context) {
      return TDuelLogMapper.selectByPK(args.logId);
    },
  },

  Mutation: {
    insertDuelLog(parent, args, context) {
      return TDuelLogMapper.insert(args.input);
    },
    updateDuelLog(parent, args, context) {
      return TDuelLogMapper.update(args.input);
    },
    deleteDuelLog(parent, args, context) {
      return TDuelLogMapper.delete(args.logId);
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });
const server = new ApolloServer({
  schema: schemaWithResolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
