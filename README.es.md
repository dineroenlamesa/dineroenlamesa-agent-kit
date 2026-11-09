# Dinero en la Mesa — costes de perp DEX para agentes de IA

[English](README.md) · **Español** · [Português](README.pt-BR.md)

Antes de abrir un perpetuo, tu agente debería saber **dónde le sale más barato, con todo incluido**: la comisión taker de las dos patas más el deslizamiento de recorrer el libro de órdenes real, en 28 perp DEX, con la hora de cada lectura.

Este kit conecta cualquier agente con el servidor de [Dinero en la Mesa](https://dineroenlamesa.com/es/agents/): herramientas gratis y herramientas Pro de pago por consulta. Sin clave y sin cuenta.

## Conectar

**MCP** (Claude, Cursor, cualquier cliente MCP) — servidor remoto, streamable HTTP:

```
https://dineroenlamesa.com/agents/mcp?c=kit-github
```

- Claude Code: `claude mcp add --transport http dineroenlamesa https://dineroenlamesa.com/agents/mcp?c=kit-github`
- Claude (escritorio o web): Ajustes → Conectores → Añadir conector personalizado → pega la dirección de arriba.
- Cursor (`~/.cursor/mcp.json`):

```json
{ "mcpServers": { "dineroenlamesa": { "url": "https://dineroenlamesa.com/agents/mcp?c=kit-github" } } }
```

**HTTP sencillo** — las mismas herramientas, `GET https://dineroenlamesa.com/agents/api/<herramienta>?...` ([OpenAPI](https://dineroenlamesa.com/agents/openapi.json)).

## Ejemplo: un agente que mira antes de operar

```
python3 example_agent.py ETH 25000
```

Pide la plataforma más barata para la operación, la segunda, y la mejor pareja delta neutral a 7 días neta de abrir y cerrar. Python 3, solo la librería estándar. Las respuestas del servidor llegan en inglés.

## Herramientas

| Herramienta | Qué contesta |
|---|---|
| `best_venue` | La perp DEX más barata para este par y este tamaño |
| `trading_cost` | El coste total en todas, ordenado |
| `funding_rates` | El funding en todas, llevado a 8 h |
| `depth` | Diferencial y profundidad a ±0,5 % y ±1 % |
| `delta_neutral` | La mejor pareja largo/corto, neta de costes |
| `live_airdrops` · `changes` | Campañas abiertas y qué ha cambiado |
| `list_venues` · `signup_link` | Plataformas cubiertas y cómo abrir cuenta |

El orden es solo por coste. Algunos enlaces de alta llevan nuestro código de referido; eso nunca cambia la posición de una plataforma.

## Pro — de pago por consulta (x402)

El único escáner de funding que descuenta de cada hueco el coste real de abrir y cerrar las dos patas en los libros en vivo: 23 perp DEX, cada minuto, y cuánto suele durar cada hueco.

| Herramienta | Precio | Qué responde |
|---|---|---|
| `delta_neutral_scanner` | 0,10 USDC por escaneo | Todos los pares y todas las parejas de plataformas, cada minuto, netos de abrir y cerrar las dos patas en los libros reales, con cuánto lleva abierto cada hueco y cuánto duraron los anteriores |
| `cost_per_point` | 0,05 USDC por consulta | Puntos de airdrop por dólar de comisiones en cada perp DEX con bolsa semanal publicada, esta semana |

USDC en Base, sin cuenta. La primera llamada devuelve el precio y lo que recibes; la misma llamada con el pago firmado devuelve el resultado. No se cobra si el dato no está fresco.

**Cómo se paga:** En Claude: añade el conector de Base (mcp.base.org), entra con tu cuenta de Coinbase y pide el escáner; apruebas 0,10 USDC en Coinbase Wallet. Cualquier cliente x402 o cartera que firme USDC en Base sirve igual.

## Condiciones

Información, no consejo. Uso libre, y se puede enseñar a tus usuarios citando «Datos: Dinero en la Mesa» con los enlaces tal como llegan. No se permite copiar los datos en bloque, volver a servirlos como API propia ni cambiar los enlaces de alta. Condiciones completas: https://dineroenlamesa.com/es/agents/terms/

El código de este repositorio tiene licencia MIT. Los datos que devuelve el servidor no: los cubren las condiciones de arriba.
