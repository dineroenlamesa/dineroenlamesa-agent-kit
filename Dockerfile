# Runs the stdio MCP server in npm/ (the same code as the npm package
# dineroenlamesa-mcp). It forwards every JSON-RPC message to
# https://dineroenlamesa.com/agents/mcp (no key, read-only).
FROM node:20-alpine
WORKDIR /app
COPY npm/package.json ./
COPY npm/bin ./bin
ENV DLM_MCP_URL=https://dineroenlamesa.com/agents/mcp?c=glama
ENTRYPOINT ["node", "bin/dineroenlamesa-mcp.js"]
