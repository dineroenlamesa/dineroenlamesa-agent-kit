# Runs the stdio MCP server from this repository. It forwards every JSON-RPC
# message to https://dineroenlamesa.com/agents/mcp (no key, read-only).
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY bin ./bin
ENV DLM_MCP_URL=https://dineroenlamesa.com/agents/mcp?c=glama
ENTRYPOINT ["node", "bin/dineroenlamesa-mcp.js"]
