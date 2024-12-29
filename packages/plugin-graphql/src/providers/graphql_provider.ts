import { Provider, IAgentRuntime, State, ServiceType, Memory } from "@ai16z/eliza";
import { GraphQLService } from "../services/graphql";

export const graphqlProvider: Provider = {
  //name: "GRAPHQL_DATA",
  get: async (runtime: IAgentRuntime, message: Memory, state?: State, query?: string) => {
    const service = runtime.services.get(ServiceType.GRAPHQL) as GraphQLService;

    try {
      const defaultQuery:string = "{ __schema { types { name } } }";  // Default introspection query
      const data = await service.query<any>(query || defaultQuery);
      return {
        graphqlData: data
      };
    } catch (error) {
      console.error("GraphQL query failed:", error);
      return {
        graphqlData: null
      };
    }
  }
};
