import { TTheme } from "../types/generated/graphql";
import { injectable } from "inversify";
import { ConnectedDB } from "./ConnectedDB";

@injectable()
export class TThemeMapper {
  /** 全件取得 */
  selectAll(): TTheme[] {
    const result = ConnectedDB.db.prepare("select * from T_THEME").all();

    return result.map((row: any) => {
      return {
        themeId: row.THEME_ID,
        themeName: row.THEME_NAME,
      };
    });
  }

  /** レコード取得 */
  selectByPK(id: number): TTheme {
    const result: any = ConnectedDB.db
      .prepare("select * from T_THEME where THEME_ID = ?")
      .get(id);

    const response: TTheme = {
      themeId: result.THEME_ID,
      themeName: result.THEME_NAME,
    };

    return response;
  }

  /** レコード追加 */
  insert(input: TTheme): TTheme {
    const result = ConnectedDB.db
      .prepare("insert into T_THEME values(?, ?)")
      .run(null, input.themeName);
    return { ...input, themeId: result.lastInsertRowid as number };
  }

  /** レコード更新 */
  update(input: TTheme): TTheme {
    const result = ConnectedDB.db
      .prepare("update T_THEME set THEME_NAME = ? where THEME_ID = ?")
      .run(input.themeName, input.themeId);
    return { ...input };
  }

  /** レコードを削除 */
  delete(id: number): number {
    const result = ConnectedDB.db
      .prepare("delete from T_THEME where THEME_ID = ?")
      .run(id);
    return result.changes;
  }
}
