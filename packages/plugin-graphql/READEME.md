# @ai16z/plugin-graphql

GraphQL integration plugin for Eliza agents.

## Installation
bash
pnpm add @ai16z/plugin-graphql


## Usage

1. Add the plugin to your character configuration:
`json
{
"name": "GraphQL Agent",
"plugins": ["@ai16z/plugin-graphql"],
"settings": {
"secrets": {
"GRAPHQL_ENDPOINT": "your-endpoint",
"GRAPHQL_TOKEN": "your-token"
}
}
}`

2. The agent will now have access to GraphQL querying capabilities through:
   - The `GRAPHQL_QUERY` action
   - Automatic context injection via the GraphQL provider
   -
## Configuration

The plugin requires the following configuration in your character settings:

- `GRAPHQL_ENDPOINT`: Your GraphQL API endpoint
- `GRAPHQL_TOKEN` (optional): Authentication token

## Actions

### GRAPHQL_QUERY
Executes a GraphQL query based on user request.

Example:

`typescript:packages/plugin-graphql/READEME.md
await runtime.executeAction("GRAPHQL_QUERY", {
query: "{ users { id name } }"
});`

## Providers

The plugin automatically injects GraphQL query results into agent context when relevant.