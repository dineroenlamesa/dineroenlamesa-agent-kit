#!/usr/bin/env node
// Dinero en la Mesa — puente MCP por stdio hacia el servidor remoto.
// Por qué existe: muchos clientes MCP (Claude Desktop, Cursor, Cline...) solo
// arrancan servidores locales por stdio. Este puente no lleva datos ni cálculo:
// reenvía cada mensaje JSON-RPC a https://dineroenlamesa.com/agents/mcp y
// devuelve la respuesta. Sin dependencias. Canal c=npm para el panel.
'use strict';
const URL_SERVIDOR = process.env.DLM_MCP_URL || 'https://dineroenlamesa.com/agents/mcp?c=npm';
const VERSION = '1.0.0';
let sesion = null;
let cola = Promise.resolve();

function escribir(obj) { process.stdout.write(JSON.stringify(obj) + '\n'); }

function errorPara(msg, texto) {
  if (msg && msg.id !== undefined && msg.id !== null) {
    escribir({ jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: texto } });
  }
}

function deSSE(cuerpo) {
  const salida = [];
  for (const bloque of cuerpo.split(/\r?\n\r?\n/)) {
    const datos = bloque.split(/\r?\n/).filter(l => l.startsWith('data:')).map(l => l.slice(5).trim()).join('\n');
    if (datos) { try { salida.push(JSON.parse(datos)); } catch (_) {} }
  }
  return salida;
}

async function reenviar(linea) {
  let msg;
  try { msg = JSON.parse(linea); } catch (_) { return; }
  const cab = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream',
    'User-Agent': 'dineroenlamesa-mcp/' + VERSION
  };
  if (sesion) cab['Mcp-Session-Id'] = sesion;
  let r;
  try {
    r = await fetch(URL_SERVIDOR, { method: 'POST', headers: cab, body: linea });
  } catch (e) { return errorPara(msg, 'dineroenlamesa.com unreachable: ' + e.message); }
  const s = r.headers.get('mcp-session-id');
  if (s) sesion = s;
  const cuerpo = await r.text();
  if (!cuerpo.trim()) return;                      // notificaciones: 202 sin cuerpo
  const tipo = r.headers.get('content-type') || '';
  if (tipo.includes('text/event-stream')) { deSSE(cuerpo).forEach(escribir); return; }
  try {
    const j = JSON.parse(cuerpo);
    (Array.isArray(j) ? j : [j]).forEach(escribir);
  } catch (_) { errorPara(msg, 'HTTP ' + r.status + ' from dineroenlamesa.com'); }
}

let resto = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', trozo => {
  resto += trozo;
  let i;
  while ((i = resto.indexOf('\n')) >= 0) {
    const linea = resto.slice(0, i).trim();
    resto = resto.slice(i + 1);
    if (linea) cola = cola.then(() => reenviar(linea));
  }
});
process.stdin.on('end', () => { cola.then(() => process.exit(0)); });
