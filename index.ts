import { loadSchemaSync } from "@graphql-tools/load";
import { TBattleLogMapper } from "./src/dao/TBattleLogMapper";
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
    battleLogs() {
      return TBattleLogMapper.selectAll();
    },
    battleLog(parent, args, context) {
      return TBattleLogMapper.selectByPK(args.logId);
    },
  },

  Mutation: {
    insertBattleLog(parent, args, context) {
      return TBattleLogMapper.insert(args.input);
    },
    updateBattleLog(parent, args, context) {
      return TBattleLogMapper.update(args.input);
    },
    deleteBattleLog(parent, args, context) {
      return TBattleLogMapper.delete(args.logId);
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
