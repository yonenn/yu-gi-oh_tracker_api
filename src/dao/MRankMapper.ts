import Database from "better-sqlite3";
import { DB_FILE_DIR } from "../util/dbConfig";
import { MRank } from "../types/generated/graphql";

const db = new Database(DB_FILE_DIR);

export const MRankMapper = {
  /** 全件取得 */
  selectAll: (): MRank[] => {
    const result = db.prepare("select * from M_RANK").all();

    return result.map((row: any) => {
      return {
        rankId: row.RANK_ID,
        rankName: row.RANK_NAME,
        tier: row.TIER,
      };
    });
  },

  /** レコード取得 */
  selectByPK: (id: number): MRank => {
    const result: any = db
      .prepare("select * from M_RANK where RANK_ID = ?")
      .get(id);

    const response: MRank = {
      rankId: result.RANK_ID,
      rankName: result.RANK_NAME,
      tier: result.TIER,
    };

    return response;
  },

  /** レコード追加 */
  insert: (input: MRank): MRank => {
    const result = db
      .prepare("insert into M_RANK values(?, ?, ?)")
      .run(null, input.rankName, input.tier);
    return { ...input, rankId: result.lastInsertRowid as number };
  },

  /** レコード更新 */
  update: (input: MRank): MRank => {
    const result = db
      .prepare("update M_RANK set RANK_NAME = ?, TIER = ? where RANK_ID = ?")
      .run(input.rankName, input.tier, input.rankId);
    return { ...input };
  },

  /** レコードを削除 */
  delete: (id: number): number => {
    const result = db.prepare("delete from M_RANK where RANK_ID = ?").run(id);
    return result.changes;
  },
};
