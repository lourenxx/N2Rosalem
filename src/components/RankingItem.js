// Linha do ranking: posição, jogador, data e pontuação.
import { Text, View } from 'react-native';
import { estilos } from '../styles/RankingItem.styles';

/**
 * Formata uma data ISO para o formato dd/mm/aaaa.
 */
function formatarData(dataIso) {
  const d = new Date(dataIso);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${d.getFullYear()}`;
}

/**
 * @param {object} props
 * @param {number} props.posicao posição no ranking (1 a 5)
 * @param {{jogador:string, pontuacao:number, data:string}} props.recorde
 */
export default function RankingItem({ posicao, recorde }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.posicao}>{posicao}º</Text>
      <View style={estilos.info}>
        <Text style={estilos.jogador} numberOfLines={1}>
          {recorde.jogador}
        </Text>
        <Text style={estilos.data}>{formatarData(recorde.data)}</Text>
      </View>
      <Text style={estilos.pontuacao}>{recorde.pontuacao}</Text>
    </View>
  );
}
