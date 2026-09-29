// Lógica pura da montagem da partida (sem React nem banco).

export const TOTAL_PARES = 6;

// Fisher-Yates: embaralha uma cópia sem alterar o array original.
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Monta as 12 cartas: sorteia 6 figuras, duplica em pares e embaralha.
// Cada carta tem um "id" (posição) e um "figuraId" (identifica o par).
export function montarPartida(figuras) {
  if (!Array.isArray(figuras) || figuras.length < TOTAL_PARES) {
    throw new Error(
      `São necessárias pelo menos ${TOTAL_PARES} figuras para iniciar uma partida.`
    );
  }

  const sorteadas = embaralhar(figuras).slice(0, TOTAL_PARES);

  const cartas = sorteadas.flatMap((figura) => [
    { figuraId: figura.id, descricao: figura.descricao, imagemUri: figura.imagemUri },
    { figuraId: figura.id, descricao: figura.descricao, imagemUri: figura.imagemUri },
  ]);

  return embaralhar(cartas).map((carta, indice) => ({ id: indice, ...carta }));
}
