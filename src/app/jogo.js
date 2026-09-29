// Tela da Partida: orquestra os hooks (regras + cronômetro), carrega as
// figuras do banco e, ao vencer, calcula a pontuação e salva no ranking.
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import Botao from '../components/Botao';
import Carta from '../components/Carta';
import { listarFiguras } from '../database/figurasRepository';
import { salvarRecorde } from '../database/rankingRepository';
import { TOTAL_PARES } from '../game/montarPartida';
import { calcularPontuacao } from '../game/pontuacao';
import { useCronometro, formatarTempo } from '../hooks/useCronometro';
import { useJogoMemoria } from '../hooks/useJogoMemoria';
import { estilos } from '../styles/jogo.styles';

export default function Jogo() {
  const db = useSQLiteContext();
  const [figuras, setFiguras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [jogador, setJogador] = useState('');
  const [recordeSalvo, setRecordeSalvo] = useState(false);

  const jogo = useJogoMemoria(figuras);
  // O cronômetro corre enquanto há cartas na mesa e o jogo não terminou.
  const cronometro = useCronometro(jogo.cartas.length > 0 && !jogo.venceu);

  // Carrega as figuras ao abrir a tela.
  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      (async () => {
        try {
          const lista = await listarFiguras(db);
          if (ativo) setFiguras(lista);
        } finally {
          if (ativo) setCarregando(false);
        }
      })();
      return () => {
        ativo = false;
      };
    }, [db])
  );

  // Quando as figuras chegam (e há o suficiente), inicia a partida.
  useEffect(() => {
    if (figuras.length >= TOTAL_PARES) {
      jogo.iniciar();
      cronometro.reiniciar();
    }
    // Só depende de "figuras": iniciar/reiniciar são estáveis o bastante aqui.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figuras]);

  const pontuacao = calcularPontuacao({
    erros: jogo.erros,
    tempoSegundos: cronometro.segundos,
  });

  // Reinicia a partida do zero.
  function jogarNovamente() {
    jogo.iniciar();
    cronometro.reiniciar();
    setJogador('');
    setRecordeSalvo(false);
  }

  // Salva o recorde atual no ranking.
  async function salvar() {
    try {
      await salvarRecorde(db, {
        jogador,
        pontuacao,
        erros: jogo.erros,
        tempoSegundos: cronometro.segundos,
      });
      setRecordeSalvo(true);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o recorde.');
    }
  }

  // --- Estados de tela ---

  if (carregando) {
    return (
      <View style={estilos.centralizado}>
        <Text style={estilos.aviso}>Carregando...</Text>
      </View>
    );
  }

  // Sem figuras suficientes: orienta o usuário a cadastrar mais.
  if (figuras.length < TOTAL_PARES) {
    return (
      <View style={estilos.centralizado}>
        <Text style={estilos.aviso}>
          Você precisa de pelo menos {TOTAL_PARES} figuras cadastradas para jogar.
          {'\n'}Atualmente há {figuras.length}.
        </Text>
        <Botao
          titulo="Ir para o cadastro"
          aoPressionar={() => router.push('/cadastro')}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      {/* Placar: erros e tempo */}
      <View style={estilos.placar}>
        <View style={estilos.placarItem}>
          <Text style={estilos.placarLabel}>Erros</Text>
          <Text style={[estilos.placarValor, estilos.placarErros]}>
            {jogo.erros}
          </Text>
        </View>
        <View style={estilos.placarItem}>
          <Text style={estilos.placarLabel}>Tempo</Text>
          <Text style={estilos.placarValor}>
            {formatarTempo(cronometro.segundos)}
          </Text>
        </View>
      </View>

      {/* Grade de 12 cartas */}
      <View style={estilos.grade}>
        {jogo.cartas.map((carta) => (
          <Carta
            key={carta.id}
            carta={carta}
            virada={jogo.estaVirada(carta)}
            aoPressionar={() => jogo.virarCarta(carta)}
          />
        ))}
      </View>

      {/* Resultado final (aparece só ao vencer) */}
      {jogo.venceu && (
        <View style={estilos.resultado}>
          <Text style={estilos.resultadoTitulo}>Parabéns!</Text>
          <Text style={estilos.resultadoTexto}>
            Você concluiu o jogo com {jogo.erros} erro(s).
          </Text>
          <Text style={estilos.resultadoTexto}>
            Tempo: {formatarTempo(cronometro.segundos)}
          </Text>
          <Text style={estilos.resultadoTexto}>Pontuação: {pontuacao}</Text>

          {recordeSalvo ? (
            <Text style={estilos.resultadoTexto}>Recorde salvo no ranking!</Text>
          ) : (
            <>
              <TextInput
                style={estilos.input}
                placeholder="Seu nome (para o ranking)"
                placeholderTextColor="#64748B"
                value={jogador}
                onChangeText={setJogador}
              />
              <Botao titulo="Salvar no ranking" aoPressionar={salvar} />
            </>
          )}

          <View style={estilos.acoes}>
            <Botao
              titulo="Jogar novamente"
              variante="secundario"
              aoPressionar={jogarNovamente}
            />
            <View style={estilos.espaco} />
            <Botao
              titulo="Ver ranking"
              variante="secundario"
              aoPressionar={() => router.push('/ranking')}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
