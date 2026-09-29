// Acesso ao banco (SQLite) para as figuras. As telas usam estas funções
// em vez de escrever SQL diretamente.

export async function listarFiguras(db) {
  const linhas = await db.getAllAsync(
    'SELECT id, descricao, imagem_uri FROM figuras ORDER BY id DESC'
  );
  return linhas.map((l) => ({
    id: l.id,
    descricao: l.descricao,
    imagemUri: l.imagem_uri,
  }));
}

export async function inserirFigura(db, { descricao, imagemUri }) {
  // Reforça as obrigatoriedades no ponto de escrita, além da validação da tela.
  if (!descricao?.trim()) throw new Error('A descrição é obrigatória.');
  if (!imagemUri) throw new Error('A imagem é obrigatória.');

  const resultado = await db.runAsync(
    'INSERT INTO figuras (descricao, imagem_uri, criado_em) VALUES (?, ?, ?)',
    descricao.trim(),
    imagemUri,
    new Date().toISOString()
  );
  return resultado.lastInsertRowId;
}

export async function excluirFigura(db, id) {
  await db.runAsync('DELETE FROM figuras WHERE id = ?', id);
}
