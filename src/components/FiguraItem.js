// Item da lista de figuras cadastradas: imagem, descrição e botão de excluir.
import { Image, Pressable, Text, View } from 'react-native';
import { estilos } from '../styles/FiguraItem.styles';

/**
 * @param {object} props
 * @param {{id:number, descricao:string, imagemUri:string}} props.figura
 * @param {(id:number) => void} props.aoExcluir
 */
export default function FiguraItem({ figura, aoExcluir }) {
  return (
    <View style={estilos.container}>
      <Image source={{ uri: figura.imagemUri }} style={estilos.imagem} />
      <Text style={estilos.descricao} numberOfLines={2}>
        {figura.descricao}
      </Text>
      <Pressable onPress={() => aoExcluir(figura.id)} style={estilos.botaoExcluir}>
        <Text style={estilos.textoExcluir}>Excluir</Text>
      </Pressable>
    </View>
  );
}
