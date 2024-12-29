import { Plugin } from "@ai16z/eliza";
import { graphqlProvider } from "./providers/graphql_provider";
import { graphqlQueryAction } from "./actions/graphql_query";
import { GraphQLService } from "./services/graphql";

export const graphqlPlugin: Plugin = {
  name: "graphql",
  description: "GraphQL integration for Eliza agents",
  actions: [graphqlQueryAction],
  providers: [graphqlProvider],
  services: [GraphQLService]
};

export default graphqlPlugin;