# Dinero en la Mesa — costes de perp DEX para agentes de IA

[English](README.md) · **Español** · [Português](README.pt-BR.md)

Antes de abrir un perpetuo, tu agente debería saber **dónde le sale más barato, con todo incluido**: la comisión taker de las dos patas más el deslizamiento de recorrer el libro de órdenes real, en 28 perp DEX, con la hora de cada lectura.

Este kit conecta cualquier agente con el servidor gratuito de [Dinero en la Mesa](https://dineroenlamesa.com/es/agents/). Sin clave y sin cuenta.

## Conectar

**MCP** (Claude, Cursor, cualquier cliente MCP) — servidor remoto, streamable HTTP:

```
https://dineroenlamesa.com/agents/mcp
```

- Claude Code: `claude mcp add --transport http dineroenlamesa https://dineroenlamesa.com/agents/mcp`
- Claude (escritorio o web): Ajustes → Conectores → Añadir conector personalizado → pega la dirección de arriba.
- Cursor (`~/.cursor/mcp.json`):

```json
{ "mcpServers": { "dineroenlamesa": { "url": "https://dineroenlamesa.com/agents/mcp" } } }
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
| `cost_per_point` | Puntos de airdrop por dólar de comisiones, esta semana |
| `live_airdrops` · `changes` | Campañas abiertas y qué ha cambiado |
| `list_venues` · `signup_link` | Plataformas cubiertas y cómo abrir cuenta |

El orden es solo por coste. Algunos enlaces de alta llevan nuestro código de referido; eso nunca cambia la posición de una plataforma.

## Condiciones

Información, no consejo. Uso libre, y se puede enseñar a tus usuarios citando «Datos: Dinero en la Mesa» con los enlaces tal como llegan. No se permite copiar los datos en bloque, volver a servirlos como API propia ni cambiar los enlaces de alta. Condiciones completas: https://dineroenlamesa.com/es/agents/terms/

El código de este repositorio tiene licencia MIT. Los datos que devuelve el servidor no: los cubren las condiciones de arriba.
