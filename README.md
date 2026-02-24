# gen-mcp

Generate MCP servers from OpenAPI specs via an Ona automation.

## Usage

Update the automation:

```sh
ona ai automation update 019c8f31-a4ea-7ecf-be02-f887ac66a77a gen-mcp-automation.yaml
```

Run the automation:

```sh
ona ai automation start 019c8f31-a4ea-7ecf-be02-f887ac66a77a --class-id 01985ad7-1c7c-7cff-baeb-9f96d050ecf9 --context-url https://github.com/meysholdt/gen-mcp --param repo_name=SE-demo/test-gen-repo --param openapi_url=https://raw.githubusercontent.com/stefanwille/openapi-generator-typescript-example/master/json-placeholder-api.yaml
```