import {
  Action,
  IAgentRuntime,
  Memory,
  State,
  HandlerCallback,
  composeContext,
  generateText,
  ModelClass,
  parseJSONObjectFromText,
  ServiceType
} from "@ai16z/eliza";
import { GraphQLService } from "../services/graphql";

export const graphqlQueryAction: Action = {
  name: "GRAPHQL_QUERY",
  similes: ["QUERY_DATABASE", "FETCH_DATA"],
  description: "Query specific data from the GraphQL database based on user request",
  examples: [
   [ {
      user: "user",
      content: {
        text: "Average price of a house in the city: $300,000"
      }
    }]
  ],
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return !!runtime.character.settings?.secrets?.GRAPHQL_ENDPOINT;
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: any,
    callback?: HandlerCallback
  ) => {
    const service = runtime.services.get(ServiceType.GRAPHQL) as GraphQLService;

    // Generate query based on user request
    const queryResponse = await generateText({
      runtime,
      context: message.content.text,
      modelClass: ModelClass.SMALL,
    });

    try {
      const data = await service.query(queryResponse);

      if (callback) {
        await callback({
          text: `Here's what I found:\n${JSON.stringify(data, null, 2)}`,
          action: "GRAPHQL_QUERY_RESPONSE",
          source: message.content.source,
        });}

      return true;
    } catch (error) {
      console.error("GraphQL query failed:", error);
      return false;
    }
  }
};