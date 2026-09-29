// Carta do jogo da memória.
// Mostra "?" quando fechada e a imagem + descrição da linguagem quando virada.
// Usa a API Animated (nativa do React Native) para uma animação simples de
// virar (recurso bônus da atividade).
import { useEffect, useMemo, useState } from 'react';
import { Animated, Image, Pressable, Text } from 'react-native';
import { estilos } from '../styles/Carta.styles';

/**
 * @param {object} props
 * @param {{descricao:string, imagemUri:string}} props.carta
 * @param {boolean} props.virada se a face da imagem está à mostra
 * @param {() => void} props.aoPressionar
 */
export default function Carta({ carta, virada, aoPressionar }) {
  // Valor animado (0 = fechada, 1 = virada). Criado uma única vez com o
  // inicializador "lazy" do useState, para não recriar a cada render nem
  // precisar ler ref.current durante a renderização.
  const [progresso] = useState(() => new Animated.Value(virada ? 1 : 0));

  useEffect(() => {
    Animated.timing(progresso, {
      toValue: virada ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [virada, progresso]);

  // Leve efeito de "pulo" na escala enquanto vira.
  const escala = useMemo(
    () =>
      progresso.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.92, 1],
      }),
    [progresso]
  );

  return (
    <Pressable onPress={aoPressionar} style={estilos.container}>
      <Animated.View
        style={[
          estilos.carta,
          virada ? estilos.cartaVirada : estilos.cartaFechada,
          { transform: [{ scale: escala }] },
        ]}
      >
        {virada ? (
          <>
            <Image
              source={{ uri: carta.imagemUri }}
              style={estilos.imagem}
              resizeMode="cover"
            />
            <Text style={estilos.descricao} numberOfLines={1}>
              {carta.descricao}
            </Text>
          </>
        ) : (
          <Text style={estilos.interrogacao}>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
