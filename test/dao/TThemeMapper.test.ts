import "reflect-metadata";
import { container } from "../../inversify.config";
import { TThemeMapper } from "../../src/dao/TThemeMapper";
import { ConnectedDB } from "../../src/dao/ConnectedDB";

const tThemeMapper = container.get(TThemeMapper);

afterEach(() => {
  ConnectedDB.db.prepare("delete from T_THEME").run();
  ConnectedDB.db.prepare("delete from sqlite_sequence").run();
});

describe("TThemeMapperのテスト", () => {
  it("登録のテスト", () => {
    const inputData = {
      themeName: "テーマ名",
    };
    const actual = tThemeMapper.insert(inputData);
    expect(actual).toStrictEqual({ ...inputData, themeId: 1 });
  });

  it("更新のテスト", () => {
    const inputData = {
      themeName: "テーマ名",
    };
    const result = tThemeMapper.insert(inputData);
    const actual = tThemeMapper.update({ ...result, themeName: "テーマ名2" });
    expect(actual).toStrictEqual({ themeId: 1, themeName: "テーマ名2" });
  });

  it("1件取得のテスト", () => {
    const inputData = {
      themeName: "テーマ名",
    };
    const result = tThemeMapper.insert(inputData);

    const actual = tThemeMapper.selectByPK(1);
    expect(actual).toStrictEqual(result);
  });

  it("全件取得のテスト", () => {
    const inputData = {
      themeName: "テーマ名",
    };
    const result1 = tThemeMapper.insert(inputData);
    const result2 = tThemeMapper.insert(inputData);
    const actual = tThemeMapper.selectAll();
    expect(actual).toStrictEqual([result1, result2]);
  });

  it("削除のテスト", () => {
    const inputData = {
      themeName: "テーマ名",
    };
    const result1 = tThemeMapper.insert(inputData);
    const result2 = tThemeMapper.insert(inputData);
    tThemeMapper.delete(1);
    const actual = tThemeMapper.selectAll();
    expect(actual).toStrictEqual([result2]);
  });
});
