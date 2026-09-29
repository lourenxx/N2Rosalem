// Menu inicial: navega para as demais telas.
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Botao from '../components/Botao';
import { estilos } from '../styles/menu.styles';

export default function Menu() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Jogo da Memória</Text>
      <Text style={estilos.subtitulo}>Linguagens de Programação</Text>

      <View style={estilos.botoes}>
        <Botao titulo="Jogar" aoPressionar={() => router.push('/jogo')} />
        <View style={estilos.espaco} />
        <Botao
          titulo="Cadastrar Figuras"
          variante="secundario"
          aoPressionar={() => router.push('/cadastro')}
        />
        <View style={estilos.espaco} />
        <Botao
          titulo="Ranking"
          variante="secundario"
          aoPressionar={() => router.push('/ranking')}
        />
      </View>
    </View>
  );
}
