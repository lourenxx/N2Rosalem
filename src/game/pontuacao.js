// Pontuação da partida: 1000 pontos, menos 50 por erro e 2 por segundo.
// Nunca fica abaixo de 0. Terminar rápido e sem errar dá mais pontos.

const PONTOS_INICIAIS = 1000;
const PENALIDADE_ERRO = 50;
const PENALIDADE_SEGUNDO = 2;

export function calcularPontuacao({ erros, tempoSegundos }) {
  const bruto =
    PONTOS_INICIAIS - erros * PENALIDADE_ERRO - tempoSegundos * PENALIDADE_SEGUNDO;
  return Math.max(0, Math.round(bruto));
}
