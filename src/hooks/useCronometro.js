// Cronômetro da partida: conta os segundos enquanto "ativo" for true.
import { useEffect, useRef, useState } from 'react';

export function useCronometro(ativo) {
  const [segundos, setSegundos] = useState(0);
  const intervaloRef = useRef(null);

  useEffect(() => {
    if (ativo) {
      intervaloRef.current = setInterval(() => setSegundos((s) => s + 1), 1000);
    }
    // Limpa o intervalo ao pausar ou desmontar.
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [ativo]);

  const reiniciar = () => setSegundos(0);

  return { segundos, reiniciar };
}

// Formata segundos como MM:SS (ex.: 75 -> "01:15").
export function formatarTempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');
  return `${min}:${seg}`;
}
