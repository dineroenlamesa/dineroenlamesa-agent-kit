# dineroenlamesa-mcp

**Dinero en la Mesa** for any MCP client: the live all-in cost of a trade (fees + slippage on the real order book, opening and closing) and the funding rates on **28 perp DEXs**. Free, read-only, no key, no account.

```json
{
  "mcpServers": {
    "dineroenlamesa": { "command": "npx", "args": ["-y", "dineroenlamesa-mcp"] }
  }
}
```

Paste that into your client's MCP settings (Claude Desktop, Cursor, Cline, Windsurf…) and ask:
*"Where is it cheapest to open 25,000 $ of ETH right now?"* · *"Best delta-neutral funding pair for BTC today?"*

If your client speaks remote MCP, you don't need this package: connect to `https://dineroenlamesa.com/agents/mcp` directly.

This package is a thin bridge (stdio ↔ HTTPS). It carries no data and no logic: every answer comes from the server, with its time and source. Node 18+, no dependencies.

Tools, examples and limits: https://dineroenlamesa.com/agents/ · Terms: https://dineroenlamesa.com/agents/terms/

---

**Español** — El coste real de operar (comisiones + deslizamiento en el libro de órdenes) y el funding en 28 perp DEX, para cualquier cliente MCP. Gratis, sin clave. Pega el bloque de arriba en la configuración MCP de tu cliente. Más: https://dineroenlamesa.com/es/agents/

**Português (Brasil)** — O custo real de operar (taxas + slippage no livro de ofertas) e o funding em 28 perp DEX, para qualquer cliente MCP. Grátis, sem chave. Cole o bloco acima na configuração MCP do seu cliente. Mais: https://dineroenlamesa.com/pt/agents/
