import { GraphQLClient } from 'graphql-request';

export interface GraphQLPluginConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export interface GraphQLQueryResult<T = any> {
  data: T;
  errors?: any[];
}

export interface GraphQLServiceInterface {
  client: GraphQLClient;
  query<T>(query: string, variables?: Record<string, any>): Promise<T>;
}