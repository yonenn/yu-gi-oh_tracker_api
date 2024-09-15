import { Container } from "inversify";
import { MRankMapper } from "./src/dao/MRankMapper";
import { TDuelLogMapper } from "./src/dao/TDuelLogMapper";
import { TMyDeckMapper } from "./src/dao/TMyDeckMapper";
import { TThemeMapper } from "./src/dao/TThemeMapper";

const rootContainer = new Container();
rootContainer.bind(MRankMapper).toSelf().inSingletonScope();
rootContainer.bind(TDuelLogMapper).toSelf().inSingletonScope();
rootContainer.bind(TMyDeckMapper).toSelf().inSingletonScope();
rootContainer.bind(TThemeMapper).toSelf().inSingletonScope();

export const container = rootContainer.createChild();
