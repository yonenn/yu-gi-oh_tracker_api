/** ランク */
type MRank = {
  rankId: number;
  rankName: string;
  tier: number;
};

/** 対戦履歴 */
export type TBattleLog = {
  logId: number;
  battleDate: string;
  season: string;
  myDeck: number;
  oppositeDeck: number;
  coinToss: string;
  winLose: string;
  rank: string;
};

/** Myデッキ */
type TMyDeck = {
  myDeckId: number;
  deckName: string;
  memo: string;
};

/** テーマ */
type TTheme = {
  themeId: number;
  themeName: string;
};
