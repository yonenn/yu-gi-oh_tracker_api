import { MRank } from "../types/generated/graphql";
import { injectable } from "inversify";
import { ConnectedDB } from "./ConnectedDB";

@injectable()
export class MRankMapper {
  /** 全件取得 */
  selectAll(): MRank[] {
    const result = ConnectedDB.db.prepare("select * from M_RANK").all();

    return result.map((row: any) => {
      return {
        rankId: row.RANK_ID,
        rankName: row.RANK_NAME,
        tier: row.TIER,
      };
    });
  }

  /** レコード取得 */
  selectByPK(id: number): MRank {
    const result: any = ConnectedDB.db
      .prepare("select * from M_RANK where RANK_ID = ?")
      .get(id);

    const response: MRank = {
      rankId: result.RANK_ID,
      rankName: result.RANK_NAME,
      tier: result.TIER,
    };

    return response;
  }

  /** レコード追加 */
  insert(input: MRank): MRank {
    const result = ConnectedDB.db
      .prepare("insert into M_RANK values(?, ?, ?)")
      .run(null, input.rankName, input.tier);
    return { ...input, rankId: result.lastInsertRowid as number };
  }

  /** レコード更新 */
  update(input: MRank): MRank {
    const result = ConnectedDB.db
      .prepare("update M_RANK set RANK_NAME = ?, TIER = ? where RANK_ID = ?")
      .run(input.rankName, input.tier, input.rankId);
    return { ...input };
  }

  /** レコードを削除 */
  delete(id: number): number {
    const result = ConnectedDB.db
      .prepare("delete from M_RANK where RANK_ID = ?")
      .run(id);
    return result.changes;
  }
}
