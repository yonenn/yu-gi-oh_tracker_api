export type Context = {
  /** 認証情報とかを入れる？ */
  user?: {
    name: string;
    email: string;
    token: string;
  };
};
