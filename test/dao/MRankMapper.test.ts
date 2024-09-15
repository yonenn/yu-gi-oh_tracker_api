import "reflect-metadata";
import { container } from "../../inversify.config";
import { ConnectedDB } from "../../src/dao/ConnectedDB";
import { MRankMapper } from "../../src/dao/MRankMapper";

const mRankMapper = container.get(MRankMapper);

afterEach(() => {
  ConnectedDB.db.prepare("delete from M_RANK").run();
  ConnectedDB.db.prepare("delete from sqlite_sequence").run();
});

describe("MRankMapperのテスト", () => {
  it("登録のテスト", () => {
    const inputData = {
      rankName: "ランク名",
      tier: 1,
    };
    const actual = mRankMapper.insert(inputData);
    expect(actual).toStrictEqual({ ...inputData, rankId: 1 });
  });

  it("更新のテスト", () => {
    const inputData = {
      rankName: "ランク名",
      tier: 1,
    };
    const result = mRankMapper.insert(inputData);
    const updateData = {
      ...result,
      rankName: "ランク名2",
      tier: 2,
    };
    const actual = mRankMapper.update(updateData);
    expect(actual).toStrictEqual(updateData);
  });

  it("1件取得のテスト", () => {
    const inputData = {
      rankName: "ランク名",
      tier: 1,
    };
    const result = mRankMapper.insert(inputData);

    const actual = mRankMapper.selectByPK(1);
    expect(actual).toStrictEqual(result);
  });

  it("全件取得のテスト", () => {
    const inputData = {
      rankName: "ランク名",
      tier: 1,
    };
    const result1 = mRankMapper.insert(inputData);
    const result2 = mRankMapper.insert(inputData);
    const actual = mRankMapper.selectAll();
    expect(actual).toStrictEqual([result1, result2]);
  });

  it("削除のテスト", () => {
    const inputData = {
      rankName: "ランク名",
      tier: 1,
    };
    const result1 = mRankMapper.insert(inputData);
    const result2 = mRankMapper.insert(inputData);
    mRankMapper.delete(1);
    const actual = mRankMapper.selectAll();
    expect(actual).toStrictEqual([result2]);
  });
});
