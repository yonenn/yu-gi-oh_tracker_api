import "reflect-metadata";
import { loadSchemaSync } from "@graphql-tools/load";
import { TDuelLogMapper } from "./src/dao/TDuelLogMapper";
import { startStandaloneServer } from "@apollo/server/standalone";

import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { Resolvers } from "./src/types/generated/graphql";
import { MRankMapper } from "./src/dao/MRankMapper";
import { container } from "./inversify.config";

const mRankMapper = container.get(MRankMapper);
const tDuelLogMapper = container.get(TDuelLogMapper);

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
  Query: {
    getDuelLogs() {
      return tDuelLogMapper.selectAll();
    },
    getDuelLog(parent, args, context) {
      return tDuelLogMapper.selectByPK(args.logId);
    },
  },

  Mutation: {
    insertDuelLog(parent, args, context) {
      return tDuelLogMapper.insert(args.input);
    },
    updateDuelLog(parent, args, context) {
      return tDuelLogMapper.update(args.input);
    },
    deleteDuelLog(parent, args, context) {
      return tDuelLogMapper.delete(args.logId);
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
