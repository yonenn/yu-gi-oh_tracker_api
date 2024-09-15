import Database from "better-sqlite3";

import { TEST_DB_FILE_DIR } from "../src/util/dbConfig";
import { ConnectedDB } from "../src/dao/ConnectedDB";

// テスト用のDBに差し替え
ConnectedDB.db = new Database(TEST_DB_FILE_DIR);

// テスト前に全テーブルのデータを削除しておく
const AllTables = ConnectedDB.db
  .prepare("select name from sqlite_master where type='table'")
  .all();

AllTables.forEach((row: any) => {
  ConnectedDB.db.prepare("delete from " + row.name).run();
});
