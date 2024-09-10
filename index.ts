import { TBattleLog } from "./src/dao/model";
import { TBattleLogMapper } from "./src/dao/TBattleLogMapper";

var express = require("express");
var { buildSchema } = require("graphql");
import { graphqlHTTP } from "express-graphql";

var { ruruHTML } = require("ruru/server");
const cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    battleLog (logId: Int!): TBattleLog
    battleLogs: [TBattleLog]
  }

  type Mutation {
    insertBattleLog(input: TBattleLogInput!): TBattleLog
  }

  type TBattleLog {
  logId: Int
  battleDate: String
  season: String
  myDeck: Int
  oppositeDeck: Int
  coinToss: String
  winLose: String
  rank: Int
}

  input TBattleLogInput {
  logId: Int
  battleDate: String
  season: String
  myDeck: Int
  oppositeDeck: Int
  coinToss: String
  winLose: String
  rank: Int
}
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!";
  },
  battleLogs() {
    return TBattleLogMapper.selectAll();
  },
  battleLog({ logId }: { logId: number }) {
    return TBattleLogMapper.selectByPK(logId);
  },
  insertBattleLog({ input }: { input: TBattleLog }) {
    return TBattleLogMapper.insert(input);
  },
};

var app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

// Serve the GraphiQL IDE.
app.get("/", (_req: any, res: any) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});
