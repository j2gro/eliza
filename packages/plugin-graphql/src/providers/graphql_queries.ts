import { Action, ActionExample, composeContext, Content, generateText, HandlerCallback, IAgentRuntime, Memory, ModelClass, parseJSONObjectFromText, ServiceType, State } from "@ai16z/eliza";
import { GraphQLService } from "../services/graphql";

export const graphqlQueryTemplate = `# GraphQL Query Request
{{userRequest}}

# Instructions: Based on the user's request, determine the appropriate GraphQL query to execute.
Your response must be formatted as a JSON block with this structure:
\`\`\`json
{
  "query": "GraphQL query string",
  "variables": {}
}
\`\`\`
`;

const graphqlQueryAction: Action = {
  name: "GRAPHQL_QUERY",
  similes: ["QUERY_DATABASE", "FETCH_DATA"],
  description: "Query specific data from the GraphQL database based on user request",

  validate: async (runtime: IAgentRuntime, message: Memory) => {
    // Check if GraphQL service is available
    return runtime.services.has(ServiceType.GRAPHQL);
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options?: any,
    callback?: HandlerCallback
  ): Promise<boolean> => {
    if (!state) return false;  // Early return if no state

    const service = runtime.services.get(ServiceType.GRAPHQL) as GraphQLService;

    // Generate the appropriate query based on user request
    const context = composeContext({
      state,
      template: graphqlQueryTemplate,
     // userRequest: message.content.text
    });

    const response = await generateText({
      runtime,
      context,
      modelClass: ModelClass.SMALL,
    });

    const parsedResponse = parseJSONObjectFromText(response) as {
      query: string;
      variables?: Record<string, any>;
    };

    if (!parsedResponse?.query) {
      console.error("Failed to generate valid GraphQL query");
      return false;
    }

    try {
      const data = await service.query(parsedResponse.query, parsedResponse.variables);

      if (callback) {
        await callback({
          text: `Here's what I found:\n${JSON.stringify(data, null, 2)}`,
          action: "GRAPHQL_QUERY_RESPONSE",
          source: message.content.source,
        });
      }

      return true;
    } catch (error) {
      console.error("GraphQL query failed:", error);
      return false;
    }
  },

  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Can you fetch the latest user activity data?",
        },
      },
      {
        user: "{{user2}}",
        content: {
          text: "I'll query the database for that information.",
          action: "GRAPHQL_QUERY",
        },
      },
    ],
  ] as ActionExample[][],
};

export default graphqlQueryAction;
