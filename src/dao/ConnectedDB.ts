import Database from "better-sqlite3";
import { TEST_DB_FILE_DIR } from "../util/dbConfig";

/** 接続中のDBオブジェクトを保持するクラス */
export class ConnectedDB {
  static db = new Database(TEST_DB_FILE_DIR);
}
