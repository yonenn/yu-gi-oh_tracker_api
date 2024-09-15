import "reflect-metadata";
import { container } from "../../inversify.config";
import { ConnectedDB } from "../../src/dao/ConnectedDB";
import { TMyDeckMapper } from "../../src/dao/TMyDeckMapper";

const tMyDeckMapper = container.get(TMyDeckMapper);

afterEach(() => {
  ConnectedDB.db.prepare("delete from T_MY_DECK").run();
  ConnectedDB.db.prepare("delete from sqlite_sequence").run();
});

describe("TMyDeckMapperのテスト", () => {
  it("登録のテスト", () => {
    const inputData = {
      deckName: "デッキ名",
      memo: "メモ",
    };
    const actual = tMyDeckMapper.insert(inputData);
    expect(actual).toStrictEqual({ ...inputData, myDeckId: 1 });
  });

  it("更新のテスト", () => {
    const inputData = {
      deckName: "デッキ名",
      memo: "メモ",
    };
    const result = tMyDeckMapper.insert(inputData);
    const updateData = {
      ...result,
      deckName: "テーマ名2",
      memo: "メモ2",
    };
    const actual = tMyDeckMapper.update(updateData);
    expect(actual).toStrictEqual(updateData);
  });

  it("1件取得のテスト", () => {
    const inputData = {
      deckName: "デッキ名",
      memo: "メモ",
    };
    const result = tMyDeckMapper.insert(inputData);

    const actual = tMyDeckMapper.selectByPK(1);
    expect(actual).toStrictEqual(result);
  });

  it("全件取得のテスト", () => {
    const inputData = {
      deckName: "デッキ名",
      memo: "メモ",
    };
    const result1 = tMyDeckMapper.insert(inputData);
    const result2 = tMyDeckMapper.insert(inputData);
    const actual = tMyDeckMapper.selectAll();
    expect(actual).toStrictEqual([result1, result2]);
  });

  it("削除のテスト", () => {
    const inputData = {
      deckName: "デッキ名",
      memo: "メモ",
    };
    const result1 = tMyDeckMapper.insert(inputData);
    const result2 = tMyDeckMapper.insert(inputData);
    tMyDeckMapper.delete(1);
    const actual = tMyDeckMapper.selectAll();
    expect(actual).toStrictEqual([result2]);
  });
});
