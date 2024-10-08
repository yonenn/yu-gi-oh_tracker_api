import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MRank = {
  __typename?: 'MRank';
  rankId?: Maybe<Scalars['Int']['output']>;
  rankName?: Maybe<Scalars['String']['output']>;
  tier?: Maybe<Scalars['Int']['output']>;
};

export type MRankInput = {
  rankId?: InputMaybe<Scalars['Int']['input']>;
  rankName?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteDuelLog?: Maybe<Scalars['Int']['output']>;
  deleteRank?: Maybe<Scalars['Int']['output']>;
  insertDuelLog?: Maybe<TDuelLog>;
  insertRank?: Maybe<MRank>;
  updateDuelLog?: Maybe<TDuelLog>;
  updateRank?: Maybe<MRank>;
};


export type MutationDeleteDuelLogArgs = {
  logId: Scalars['Int']['input'];
};


export type MutationDeleteRankArgs = {
  rankId: Scalars['Int']['input'];
};


export type MutationInsertDuelLogArgs = {
  input: TDuelLogInput;
};


export type MutationInsertRankArgs = {
  input: MRankInput;
};


export type MutationUpdateDuelLogArgs = {
  input: TDuelLogInput;
};


export type MutationUpdateRankArgs = {
  input: MRankInput;
};

export type Query = {
  __typename?: 'Query';
  getDuelLog?: Maybe<TDuelLog>;
  getDuelLogs?: Maybe<Array<Maybe<TDuelLog>>>;
  getRank?: Maybe<MRank>;
  getRanks?: Maybe<Array<Maybe<MRank>>>;
};


export type QueryGetDuelLogArgs = {
  logId: Scalars['Int']['input'];
};


export type QueryGetRankArgs = {
  rankId: Scalars['Int']['input'];
};

export type TDuelLog = {
  __typename?: 'TDuelLog';
  battleDate?: Maybe<Scalars['String']['output']>;
  coinToss?: Maybe<Scalars['String']['output']>;
  logId?: Maybe<Scalars['Int']['output']>;
  myDeck?: Maybe<Scalars['Int']['output']>;
  oppositeDeck?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['String']['output']>;
  winLose?: Maybe<Scalars['String']['output']>;
};

export type TDuelLogInput = {
  battleDate?: InputMaybe<Scalars['String']['input']>;
  coinToss?: InputMaybe<Scalars['String']['input']>;
  logId?: InputMaybe<Scalars['Int']['input']>;
  myDeck?: InputMaybe<Scalars['Int']['input']>;
  oppositeDeck?: InputMaybe<Scalars['Int']['input']>;
  rank?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['String']['input']>;
  winLose?: InputMaybe<Scalars['String']['input']>;
};

export type TMyDeck = {
  __typename?: 'TMyDeck';
  deckName?: Maybe<Scalars['String']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  myDeckId?: Maybe<Scalars['Int']['output']>;
};

export type TMyDeckInput = {
  deckName?: InputMaybe<Scalars['String']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  myDeckId?: InputMaybe<Scalars['Int']['input']>;
};

export type TTheme = {
  __typename?: 'TTheme';
  themeId?: Maybe<Scalars['Int']['output']>;
  themeName?: Maybe<Scalars['String']['output']>;
};

export type TThemeInput = {
  themeId?: InputMaybe<Scalars['Int']['input']>;
  themeName?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MRank: ResolverTypeWrapper<MRank>;
  MRankInput: MRankInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TDuelLog: ResolverTypeWrapper<TDuelLog>;
  TDuelLogInput: TDuelLogInput;
  TMyDeck: ResolverTypeWrapper<TMyDeck>;
  TMyDeckInput: TMyDeckInput;
  TTheme: ResolverTypeWrapper<TTheme>;
  TThemeInput: TThemeInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  MRank: MRank;
  MRankInput: MRankInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  TDuelLog: TDuelLog;
  TDuelLogInput: TDuelLogInput;
  TMyDeck: TMyDeck;
  TMyDeckInput: TMyDeckInput;
  TTheme: TTheme;
  TThemeInput: TThemeInput;
}>;

export type MRankResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MRank'] = ResolversParentTypes['MRank']> = ResolversObject<{
  rankId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rankName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tier?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteDuelLog?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteDuelLogArgs, 'logId'>>;
  deleteRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteRankArgs, 'rankId'>>;
  insertDuelLog?: Resolver<Maybe<ResolversTypes['TDuelLog']>, ParentType, ContextType, RequireFields<MutationInsertDuelLogArgs, 'input'>>;
  insertRank?: Resolver<Maybe<ResolversTypes['MRank']>, ParentType, ContextType, RequireFields<MutationInsertRankArgs, 'input'>>;
  updateDuelLog?: Resolver<Maybe<ResolversTypes['TDuelLog']>, ParentType, ContextType, RequireFields<MutationUpdateDuelLogArgs, 'input'>>;
  updateRank?: Resolver<Maybe<ResolversTypes['MRank']>, ParentType, ContextType, RequireFields<MutationUpdateRankArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getDuelLog?: Resolver<Maybe<ResolversTypes['TDuelLog']>, ParentType, ContextType, RequireFields<QueryGetDuelLogArgs, 'logId'>>;
  getDuelLogs?: Resolver<Maybe<Array<Maybe<ResolversTypes['TDuelLog']>>>, ParentType, ContextType>;
  getRank?: Resolver<Maybe<ResolversTypes['MRank']>, ParentType, ContextType, RequireFields<QueryGetRankArgs, 'rankId'>>;
  getRanks?: Resolver<Maybe<Array<Maybe<ResolversTypes['MRank']>>>, ParentType, ContextType>;
}>;

export type TDuelLogResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TDuelLog'] = ResolversParentTypes['TDuelLog']> = ResolversObject<{
  battleDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coinToss?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  myDeck?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  oppositeDeck?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  season?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  winLose?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TMyDeckResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TMyDeck'] = ResolversParentTypes['TMyDeck']> = ResolversObject<{
  deckName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  myDeckId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TThemeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TTheme'] = ResolversParentTypes['TTheme']> = ResolversObject<{
  themeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  themeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  MRank?: MRankResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TDuelLog?: TDuelLogResolvers<ContextType>;
  TMyDeck?: TMyDeckResolvers<ContextType>;
  TTheme?: TThemeResolvers<ContextType>;
}>;

