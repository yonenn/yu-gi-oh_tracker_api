import { TDuelLog } from "../types/generated/graphql";
import { injectable } from "inversify";
import { ConnectedDB } from "./ConnectedDB";

@injectable()
export class TDuelLogMapper {
  /** 全件取得 */
  selectAll(): TDuelLog[] {
    const result = ConnectedDB.db.prepare("select * from T_DUEL_LOG").all();

    return result.map((row: any) => {
      return {
        logId: row.LOG_ID,
        battleDate: row.BATTLE_DATE,
        season: row.SEASON,
        myDeck: row.MY_DECK,
        oppositeDeck: row.OPPOSITE_DECK,
        coinToss: row.COIN_TOSS,
        winLose: row.WIN_LOSE,
        rank: row.RANK,
      };
    });
  }

  /** レコード取得 */
  selectByPK(id: number): TDuelLog {
    const result: any = ConnectedDB.db
      .prepare("select * from T_DUEL_LOG where LOG_ID = ?")
      .get(id);

    const response: TDuelLog = {
      logId: result.LOG_ID,
      battleDate: result.BATTLE_DATE,
      season: result.SEASON,
      myDeck: result.MY_DECK,
      oppositeDeck: result.OPPOSITE_DECK,
      coinToss: result.COIN_TOSS,
      winLose: result.WIN_LOSE,
      rank: result.RANK,
    };

    return response;
  }

  /** レコード追加 */
  insert(input: TDuelLog): TDuelLog {
    const result = ConnectedDB.db
      .prepare("insert into T_DUEL_LOG values(?, ?, ?, ?, ?, ?, ?, ?)")
      .run(
        null,
        input.battleDate,
        input.season,
        input.myDeck,
        input.oppositeDeck,
        input.coinToss,
        input.winLose,
        input.rank
      );
    return { ...input, logId: result.lastInsertRowid as number };
  }

  /** レコード更新 */
  update(input: TDuelLog): TDuelLog {
    const result = ConnectedDB.db
      .prepare(
        "update T_DUEL_LOG set BATTLE_DATE = ?, SEASON = ?, MY_DECK = ?, OPPOSITE_DECK = ?, COIN_TOSS = ?, WIN_LOSE = ?, RANK = ?  where LOG_ID = ?"
      )
      .run(
        input.battleDate,
        input.season,
        input.myDeck,
        input.oppositeDeck,
        input.coinToss,
        input.winLose,
        input.rank,
        input.logId
      );
    return { ...input };
  }

  /** レコードを削除 */
  delete(id: number): number {
    const result = ConnectedDB.db
      .prepare("delete from T_DUEL_LOG where LOG_ID = ?")
      .run(id);
    return result.changes;
  }
}
