# Dinero en la Mesa — custos de perp DEX para agentes de IA

[English](README.md) · [Español](README.es.md) · **Português**

Antes de abrir um perpétuo, o seu agente deveria saber **onde é mais barato operar, com tudo incluído**: a taxa taker das duas pernas mais o slippage de percorrer o livro de ofertas real, em 28 perp DEX, com a hora de cada leitura.

Este kit conecta qualquer agente ao servidor gratuito da [Dinero en la Mesa](https://dineroenlamesa.com/pt/agents/). Sem chave e sem conta.

## Conectar

**MCP** (Claude, Cursor, qualquer cliente MCP) — servidor remoto, streamable HTTP:

```
https://dineroenlamesa.com/agents/mcp?c=kit-github
```

- Claude Code: `claude mcp add --transport http dineroenlamesa https://dineroenlamesa.com/agents/mcp?c=kit-github`
- Claude (desktop ou web): Configurações → Conectores → Adicionar conector personalizado → cole o endereço acima.
- Cursor (`~/.cursor/mcp.json`):

```json
{ "mcpServers": { "dineroenlamesa": { "url": "https://dineroenlamesa.com/agents/mcp?c=kit-github" } } }
```

**HTTP simples** — as mesmas ferramentas, `GET https://dineroenlamesa.com/agents/api/<ferramenta>?...` ([OpenAPI](https://dineroenlamesa.com/agents/openapi.json)).

## Exemplo: um agente que confere antes de operar

```
python3 example_agent.py ETH 25000
```

Ele pede a plataforma mais barata para a operação, a segunda, e o melhor par delta neutro para 7 dias, líquido de abrir e fechar. Python 3, só a biblioteca padrão. As respostas do servidor chegam em inglês.

## Ferramentas

| Ferramenta | O que responde |
|---|---|
| `best_venue` | A perp DEX mais barata para este par e este tamanho |
| `trading_cost` | O custo total em todas, ordenado |
| `funding_rates` | O funding em todas, convertido para 8 h |
| `depth` | Spread e profundidade a ±0,5% e ±1% |
| `delta_neutral` | O melhor par long/short, líquido de custos |
| `cost_per_point` | Pontos de airdrop por dólar de taxas, nesta semana |
| `live_airdrops` · `changes` | Campanhas abertas e o que mudou |
| `list_venues` · `signup_link` | Plataformas cobertas e como abrir conta |

A ordem é só pelo custo. Alguns links de abertura de conta levam o nosso código de indicação; isso nunca muda a posição de uma plataforma.

## Termos

Informação, não recomendação. Uso livre, e pode mostrar aos seus usuários citando "Dados: Dinero en la Mesa" com os links como chegam. Não é permitido copiar os dados em massa, servi-los de novo como API própria nem trocar os links de abertura de conta. Termos completos: https://dineroenlamesa.com/pt/agents/terms/

O código deste repositório tem licença MIT. Os dados que o servidor devolve não: eles são cobertos pelos termos acima.
