import "reflect-metadata";
import { container } from "../../inversify.config";
import { ConnectedDB } from "../../src/dao/ConnectedDB";
import { TDuelLogMapper } from "../../src/dao/TDuelLogMapper";

const tDuelLogMapper = container.get(TDuelLogMapper);

afterEach(() => {
  ConnectedDB.db.prepare("delete from T_DUEL_LOG").run();
  ConnectedDB.db.prepare("delete from sqlite_sequence").run();
});

describe("TDuelLogMapperのテスト", () => {
  it("登録のテスト", () => {
    const inputData = {
      battleDate: "2000/01/01",
      season: "1",
      myDeck: 1,
      oppositeDeck: 1,
      coinToss: "先攻",
      winLose: "後攻",
      rank: 1,
    };
    const actual = tDuelLogMapper.insert(inputData);
    expect(actual).toStrictEqual({ ...inputData, logId: 1 });
  });

  it("更新のテスト", () => {
    const inputData = {
      battleDate: "2000/01/01",
      season: "1",
      myDeck: 1,
      oppositeDeck: 1,
      coinToss: "先攻",
      winLose: "後攻",
      rank: 1,
    };
    const result = tDuelLogMapper.insert(inputData);
    const updateData = {
      ...result,
      battleDate: "2000/02/01",
      season: "2",
      myDeck: 2,
      oppositeDeck: 2,
      coinToss: "先攻2",
      winLose: "後攻2",
      rank: 2,
    };
    const actual = tDuelLogMapper.update(updateData);
    expect(actual).toStrictEqual(updateData);
  });

  it("1件取得のテスト", () => {
    const inputData = {
      battleDate: "2000/01/01",
      season: "1",
      myDeck: 1,
      oppositeDeck: 1,
      coinToss: "先攻",
      winLose: "後攻",
      rank: 1,
    };
    const result = tDuelLogMapper.insert(inputData);

    const actual = tDuelLogMapper.selectByPK(1);
    expect(actual).toStrictEqual(result);
  });

  it("全件取得のテスト", () => {
    const inputData = {
      battleDate: "2000/01/01",
      season: "1",
      myDeck: 1,
      oppositeDeck: 1,
      coinToss: "先攻",
      winLose: "後攻",
      rank: 1,
    };
    const result1 = tDuelLogMapper.insert(inputData);
    const result2 = tDuelLogMapper.insert(inputData);
    const actual = tDuelLogMapper.selectAll();
    expect(actual).toStrictEqual([result1, result2]);
  });

  it("削除のテスト", () => {
    const inputData = {
      battleDate: "2000/01/01",
      season: "1",
      myDeck: 1,
      oppositeDeck: 1,
      coinToss: "先攻",
      winLose: "後攻",
      rank: 1,
    };
    const result1 = tDuelLogMapper.insert(inputData);
    const result2 = tDuelLogMapper.insert(inputData);
    tDuelLogMapper.delete(1);
    const actual = tDuelLogMapper.selectAll();
    expect(actual).toStrictEqual([result2]);
  });
});
