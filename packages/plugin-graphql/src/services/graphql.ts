import { IAgentRuntime, Service, ServiceType } from "@ai16z/eliza";
import { GraphQLClient } from 'graphql-request';

export class GraphQLService extends Service {
  private client: GraphQLClient;
  name = "graphql";
  get serviceType() { return ServiceType.GRAPHQL; }

  static async initialize(runtime: IAgentRuntime): Promise<void> {}

  async initialize(runtime: IAgentRuntime): Promise<void> {}

  constructor(endpoint: string, headers?: Record<string, string>) {
    super();
    this.client = new GraphQLClient(endpoint, { headers });
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    return this.client.request<T>(query, variables);
  }
}
