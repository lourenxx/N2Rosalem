// Estado e regras da partida. A montagem das cartas é uma função pura
// (../game/montarPartida); aqui fica o que muda durante o jogo: cartas
// viradas, pares encontrados, erros e fim de jogo.
import { useCallback, useState } from 'react';
import { montarPartida, TOTAL_PARES } from '../game/montarPartida';

// Tempo (ms) que o par errado fica visível antes de virar de volta.
const TEMPO_MOSTRAR_ERRO = 900;

export function useJogoMemoria(figuras) {
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const venceu = cartas.length > 0 && paresEncontrados.length === TOTAL_PARES;

  const iniciar = useCallback(() => {
    if (!figuras || figuras.length < TOTAL_PARES) return;
    setCartas(montarPartida(figuras));
    setSelecionadas([]);
    setParesEncontrados([]);
    setErros(0);
    setBloqueado(false);
  }, [figuras]);

  const virarCarta = (carta) => {
    if (bloqueado) return;
    if (selecionadas.includes(carta.id)) return;
    if (paresEncontrados.includes(carta.figuraId)) return;
    if (selecionadas.length === 2) return;

    if (selecionadas.length === 0) {
      setSelecionadas([carta.id]);
      return;
    }

    // Segunda carta: resolvemos o par aqui mesmo (e não em um efeito)
    // para evitar renders em cascata.
    const primeira = cartas.find((c) => c.id === selecionadas[0]);
    setSelecionadas([selecionadas[0], carta.id]);

    if (primeira && primeira.figuraId === carta.figuraId) {
      setParesEncontrados((atuais) => [...atuais, carta.figuraId]);
      setSelecionadas([]);
    } else {
      setErros((n) => n + 1);
      setBloqueado(true);
      setTimeout(() => {
        setSelecionadas([]);
        setBloqueado(false);
      }, TEMPO_MOSTRAR_ERRO);
    }
  };

  // Uma carta aparece virada se está selecionada agora ou se seu par já foi achado.
  const estaVirada = (carta) =>
    selecionadas.includes(carta.id) || paresEncontrados.includes(carta.figuraId);

  return {
    cartas,
    erros,
    venceu,
    bloqueado,
    iniciar,
    virarCarta,
    estaVirada,
  };
}
