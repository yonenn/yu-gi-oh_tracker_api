import { injectable } from "inversify";
import { TMyDeck } from "../types/generated/graphql";
import { ConnectedDB } from "./ConnectedDB";

@injectable()
export class TMyDeckMapper {
  /** 全件取得 */
  selectAll(): TMyDeck[] {
    const result = ConnectedDB.db.prepare("select * from T_MY_DECK").all();

    return result.map((row: any) => {
      return {
        myDeckId: row.MY_DECK_ID,
        deckName: row.DECK_NAME,
        memo: row.MEMO,
      };
    });
  }

  /** レコード取得 */
  selectByPK(id: number): TMyDeck {
    const result: any = ConnectedDB.db
      .prepare("select * from T_MY_DECK where MY_DECK_ID = ?")
      .get(id);

    const response: TMyDeck = {
      myDeckId: result.MY_DECK_ID,
      deckName: result.DECK_NAME,
      memo: result.MEMO,
    };

    return response;
  }

  /** レコード追加 */
  insert(input: TMyDeck): TMyDeck {
    const result = ConnectedDB.db
      .prepare("insert into T_MY_DECK values(?, ?, ?)")
      .run(null, input.deckName, input.memo);
    return { ...input, myDeckId: result.lastInsertRowid as number };
  }

  /** レコード更新 */
  update(input: TMyDeck): TMyDeck {
    const result = ConnectedDB.db
      .prepare(
        "update T_MY_DECK set DECK_NAME = ?, MEMO = ? where MY_DECK_ID = ?"
      )
      .run(input.deckName, input.memo, input.myDeckId);
    return { ...input };
  }

  /** レコードを削除 */
  delete(id: number): number {
    const result = ConnectedDB.db
      .prepare("delete from T_MY_DECK where MY_DECK_ID = ?")
      .run(id);
    return result.changes;
  }
}
