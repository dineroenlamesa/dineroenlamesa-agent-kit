# Dinero en la Mesa — perp DEX costs for AI agents

**English** · [Español](README.es.md) · [Português](README.pt-BR.md)

Before your agent opens a perp, it should know **where it is cheapest to trade it, all-in**: taker fee on both legs plus the slippage of walking the live order book, on 28 perp DEXs, with the time of every read.

This kit connects any agent to the free [Dinero en la Mesa](https://dineroenlamesa.com/agents/) server. No key, no account.

## Connect

**MCP** (Claude, Cursor, any MCP client) — remote server, streamable HTTP:

```
https://dineroenlamesa.com/agents/mcp?c=kit-github
```

- Claude Code: `claude mcp add --transport http dineroenlamesa https://dineroenlamesa.com/agents/mcp?c=kit-github`
- Claude (desktop or web): Settings → Connectors → Add custom connector → paste the URL above.
- Cursor (`~/.cursor/mcp.json`):

```json
{ "mcpServers": { "dineroenlamesa": { "url": "https://dineroenlamesa.com/agents/mcp?c=kit-github" } } }
```

**Plain HTTP** — same tools, `GET https://dineroenlamesa.com/agents/api/<tool>?...` ([OpenAPI](https://dineroenlamesa.com/agents/openapi.json)).

## Example: an agent that checks before it trades

```
python3 example_agent.py ETH 25000
```

It asks for the cheapest venue for the trade, the runner-up, and the best delta-neutral funding pair for 7 days net of opening and closing costs. Python 3, standard library only.

## Tools

| Tool | What it answers |
|---|---|
| `best_venue` | Cheapest perp DEX for this pair and size |
| `trading_cost` | All-in cost on every venue, ranked |
| `funding_rates` | Funding across venues, normalised to 8 h |
| `depth` | Spread and depth at ±0.5 % and ±1 % |
| `delta_neutral` | Best long/short funding pair, net of costs |
| `cost_per_point` | Airdrop points per dollar of fees, this week |
| `live_airdrops` · `changes` | Open campaigns and what changed |
| `list_venues` · `signup_link` | Venues covered and how to open an account |

The ranking is by cost only. Some account links carry our referral code; that never changes a venue's position.

## Terms

Information, not advice. Free to use and to show to your users with attribution ("Data: Dinero en la Mesa") and the links as returned. Bulk copying, re-serving the data as your own API, or replacing the account links is not allowed. Full terms: https://dineroenlamesa.com/agents/terms/

The code in this repository is MIT-licensed. The data returned by the server is not: it is covered by the terms above.
