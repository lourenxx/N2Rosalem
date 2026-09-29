// Criação/migração das tabelas do banco local (SQLite).
// Chamada uma vez pelo SQLiteProvider (prop onInit).
// user_version versiona o schema: novas migrações entram como novos blocos.

const VERSAO_BANCO = 1;

export async function migrarBanco(db) {
  const resultado = await db.getFirstAsync('PRAGMA user_version');
  let versaoAtual = resultado?.user_version ?? 0;

  if (versaoAtual >= VERSAO_BANCO) return;

  if (versaoAtual === 0) {
    // WAL melhora a performance de leitura/escrita.
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE figuras (
        id INTEGER PRIMARY KEY NOT NULL,
        descricao TEXT NOT NULL,
        imagem_uri TEXT NOT NULL,
        criado_em TEXT NOT NULL
      );

      CREATE TABLE ranking (
        id INTEGER PRIMARY KEY NOT NULL,
        jogador TEXT NOT NULL,
        pontuacao INTEGER NOT NULL,
        erros INTEGER NOT NULL,
        tempo_segundos INTEGER NOT NULL,
        data TEXT NOT NULL
      );
    `);
    versaoAtual = 1;
  }

  // Futuras migrações entram aqui:
  // if (versaoAtual === 1) { ...; versaoAtual = 2; }

  await db.execAsync(`PRAGMA user_version = ${VERSAO_BANCO}`);
}
