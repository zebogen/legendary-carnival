import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export type ApolloClient = ApolloClient<NormalizedCacheObject>;

export type Omit<T, K extends any> = Pick<T, Exclude<keyof T, K>>;