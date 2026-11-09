# Dinero en la Mesa — custos de perp DEX para agentes de IA

[English](README.md) · [Español](README.es.md) · **Português**

Antes de abrir um perpétuo, o seu agente deveria saber **onde é mais barato operar, com tudo incluído**: a taxa taker das duas pernas mais o slippage de percorrer o livro de ofertas real, em 28 perp DEX, com a hora de cada leitura.

Este kit conecta qualquer agente ao servidor da [Dinero en la Mesa](https://dineroenlamesa.com/pt/agents/): ferramentas grátis e ferramentas Pro pagas por consulta. Sem chave e sem conta.

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
| `live_airdrops` · `changes` | Campanhas abertas e o que mudou |
| `list_venues` · `signup_link` | Plataformas cobertas e como abrir conta |

A ordem é só pelo custo. Alguns links de abertura de conta levam o nosso código de indicação; isso nunca muda a posição de uma plataforma.

## Pro — pago por consulta (x402)

O único scanner de funding que desconta de cada diferença o custo real de abrir e fechar as duas pernas nos livros ao vivo: 23 perp DEX, a cada minuto, e quanto costuma durar cada diferença.

| Ferramenta | Preço | O que responde |
|---|---|---|
| `delta_neutral_scanner` | 0,10 USDC por varredura | Todos os pares e todas as duplas de plataformas, a cada minuto, líquidos de abrir e fechar as duas pernas nos livros reais, com há quanto tempo cada diferença está aberta e quanto duraram as anteriores |
| `cost_per_point` | 0,05 USDC por consulta | Pontos de airdrop por dólar de taxas em cada perp DEX com pool semanal publicado, nesta semana |
| `execution_plan` | 1 USDC por plano, **só se economizar US$ 20 ou mais** | Como dividir uma ordem grande entre plataformas, perna a perna, contra fazê-la inteira na mais barata. Abaixo de US$ 20 de economia, o plano é grátis |
| `farming_route` | 0,50 USDC por rota | O que o seu orçamento semanal de farming compra em cada perp DEX com pool de pontos: volume ao custo do seu tamanho no livro de agora (taxa + slippage) e a sua parte do pool quando o seu volume o dilui |
| `alerts` | 29 USDC por 30 dias, até 3 pares | Um webhook assinado no minuto em que uma diferença de funding líquida ou um custo cruza o seu limite, verificado a cada minuto. Antes testamos o seu webhook: se não responder, não é cobrado |
| `history` | 0,10 USDC por série, a partir de 10 de dezembro de 2026 | Funding, custo de ida e volta e spread de cada plataforma, a cada hora como os lemos, para testar uma estratégia |

USDC na Base, sem conta. A primeira chamada devolve o preço e o que você recebe; a mesma chamada com o pagamento assinado devolve o resultado. Não é cobrado se o dado não estiver atualizado, e `execution_plan`, `farming_route` e `history` respondem grátis na primeira chamada quando não há nada que valha o pagamento.

**Como pagar:** No Claude: adicione o conector da Base (mcp.base.org), entre com a sua conta da Coinbase e peça o scanner; você aprova 0,10 USDC na Coinbase Wallet. Qualquer cliente x402 ou carteira que assine USDC na Base funciona igual.

## Termos

Informação, não recomendação. Uso livre, e pode mostrar aos seus usuários citando "Dados: Dinero en la Mesa" com os links como chegam. Não é permitido copiar os dados em massa, servi-los de novo como API própria nem trocar os links de abertura de conta. Termos completos: https://dineroenlamesa.com/pt/agents/terms/

O código deste repositório tem licença MIT. Os dados que o servidor devolve não: eles são cobertos pelos termos acima.
