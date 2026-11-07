#!/usr/bin/env python3
"""Where should my agent trade this perp, and what does it really cost?

A small agent that answers one real question before it places a trade:
the cheapest perp DEX for this pair and size (fees + slippage on the live
order book, opening AND closing), the runner-up, and the best delta-neutral
funding pair net of costs. Then it gives the account-opening link.

All the data comes from the free Dinero en la Mesa server
(https://dineroenlamesa.com/agents/). No key, no account. Python 3, no
dependencies.

    python3 example_agent.py ETH 25000
"""
import json
import sys
import urllib.parse
import urllib.request

API = "https://dineroenlamesa.com/agents/api/"
CHANNEL = "kit-github"          # tells the server where this call comes from


def call(tool, **params):
    params["c"] = CHANNEL
    url = API + tool + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "dineroenlamesa-agent-kit/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def main(pair="ETH", size_usd=25000):
    size_usd = float(size_usd)
    leg = int(size_usd / 2) if (size_usd / 2).is_integer() else size_usd / 2
    size_usd = int(size_usd) if size_usd.is_integer() else size_usd
    best = call("best_venue", pair=pair, size_usd=size_usd)
    b = best["best"]
    print(f"{pair}, {size_usd:,.0f} $ opened and closed at market")
    print(f"  cheapest: {b['name']} — {b['round_trip_cost_usd']:,.2f} $ "
          f"({b['round_trip_cost_bps']} bps: fees {b['fees_usd']:,.2f} $ + slippage {b['slippage_usd']:,.2f} $)")
    for r in best.get("runners_up", [])[:2]:
        print(f"  then: {r['name']} — {r['round_trip_cost_usd']:,.2f} $" + (f"  ({r['note']})" if r.get("note") else ""))
    print(f"  book read at {b['book']['as_of']} · open an account: {b['signup_url']}")

    dn = call("delta_neutral", pair=pair, size_usd_per_leg=leg, days=7).get("best")
    if dn:
        print(f"\nDelta neutral, {leg:,.0f} $ per leg for 7 days at today's funding:")
        print(f"  long {dn['long_name']}, short {dn['short_name']}: funding {dn['funding_earned_usd']:,.2f} $"
              f" − costs {dn['entry_exit_cost_usd']:,.2f} $ = {dn['net_usd']:,.2f} $ net (a snapshot, not a forecast)")
        print(f"  accounts: {dn['signup_long']}  ·  {dn['signup_short']}")
    print("\nData: Dinero en la Mesa (dineroenlamesa.com). Information, not advice.")


if __name__ == "__main__":
    main(*sys.argv[1:3])
