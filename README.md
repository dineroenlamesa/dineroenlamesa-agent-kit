# Dinero en la Mesa — perp DEX costs for AI agents

**English** · [Español](README.es.md) · [Português](README.pt-BR.md)

Before your agent opens a perp, it should know **where it is cheapest to trade it, all-in**: taker fee on both legs plus the slippage of walking the live order book, on 28 perp DEXs, with the time of every read.

This kit connects any agent to the [Dinero en la Mesa](https://dineroenlamesa.com/agents/) server: free tools, and Pro tools paid per call. No key, no account.

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

**As a skill or a plugin** — the agent learns *when* to ask, before every perp trade:

- Any agent (Claude Code, Codex, Cursor and 40 more): `npx skills add dineroenlamesa/dineroenlamesa-agent-kit`
- Claude Code plugin (connects the server and adds the skill): `/plugin marketplace add dineroenlamesa/dineroenlamesa-agent-kit`, then `/plugin install dineroenlamesa@dineroenlamesa`

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
| `live_airdrops` · `changes` | Open campaigns and what changed |
| `list_venues` · `signup_link` | Venues covered and how to open an account |

The ranking is by cost only. Some account links carry our referral code; that never changes a venue's position.

## Pro — paid per call (x402)

The only funding scanner that nets every gap against the real cost of opening and closing both legs on live order books — 23 perp DEXs, every minute, with how long each gap usually lasts.

| Tool | Price | What it answers |
|---|---|---|
| `delta_neutral_scanner` | 0.10 USDC per scan | Every pair and every venue couple, read every minute, net of opening and closing both legs on the live books, with how long each gap has been open and how long past gaps lasted |
| `cost_per_point` | 0.05 USDC per call | Airdrop points per dollar of fees on every perp DEX with a published weekly pool, this week |
| `execution_plan` | 1 USDC per plan, **only if it saves $20 or more** | How to split a large order across venues, leg by leg, against doing it all on the cheapest one. Below $20 of saving the plan is free |
| `farming_route` | 0.50 USDC per route | What your weekly farming budget buys on each perp DEX with a points pool: volume at your order size on the live book (fees + slippage) and your share of the pool once your volume dilutes it |
| `alerts` | 29 USDC per 30 days, up to 3 pairs | A signed webhook the minute a net funding gap or a trading cost crosses your threshold, checked every minute. We test your webhook first: no answer, no charge |
| `history` | 0.10 USDC per series, from 10 December 2026 | Funding, round-trip cost and spread per venue, hourly as we read them, to backtest a strategy |

USDC on Base, no account. The first call returns the price and what you get; the same call with the signed payment returns the result. Not charged if the data is stale, and `execution_plan`, `farming_route` and `history` answer free on the first call when there is nothing worth paying for.

**How to pay:** In Claude: add the Base connector (mcp.base.org), sign in with your Coinbase account and ask for the scan; you approve 0.10 USDC in Coinbase Wallet. Any x402 client or wallet that signs USDC on Base works the same way.

## Terms

Information, not advice. Free to use and to show to your users with attribution ("Data: Dinero en la Mesa") and the links as returned. Bulk copying, re-serving the data as your own API, or replacing the account links is not allowed. Full terms: https://dineroenlamesa.com/agents/terms/

The code in this repository is MIT-licensed. The data returned by the server is not: it is covered by the terms above.
