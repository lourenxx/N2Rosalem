// Acesso ao banco (SQLite) para o ranking de recordes.

export async function salvarRecorde(db, { jogador, pontuacao, erros, tempoSegundos }) {
  const nome = jogador?.trim() || 'Jogador';
  const resultado = await db.runAsync(
    'INSERT INTO ranking (jogador, pontuacao, erros, tempo_segundos, data) VALUES (?, ?, ?, ?, ?)',
    nome,
    pontuacao,
    erros,
    tempoSegundos,
    new Date().toISOString()
  );
  return resultado.lastInsertRowId;
}

// Top 5: maior pontuacao primeiro; em empate, menor tempo.
export async function listarTop5(db) {
  const linhas = await db.getAllAsync(
    `SELECT id, jogador, pontuacao, erros, tempo_segundos, data
     FROM ranking
     ORDER BY pontuacao DESC, tempo_segundos ASC
     LIMIT 5`
  );
  return linhas.map((l) => ({
    id: l.id,
    jogador: l.jogador,
    pontuacao: l.pontuacao,
    erros: l.erros,
    tempoSegundos: l.tempo_segundos,
    data: l.data,
  }));
}
