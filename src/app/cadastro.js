// Tela de Cadastro de Figuras: escolher imagem da galeria, digitar descrição,
// validar (não salva sem imagem nem sem descrição), listar e excluir.
// O acesso ao banco fica no figurasRepository.
import * as ImagePicker from 'expo-image-picker';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Alert, FlatList, Image, Text, TextInput, View } from 'react-native';
import Botao from '../components/Botao';
import FiguraItem from '../components/FiguraItem';
import {
  excluirFigura,
  inserirFigura,
  listarFiguras,
} from '../database/figurasRepository';
import { estilos } from '../styles/cadastro.styles';

export default function Cadastro() {
  const db = useSQLiteContext();
  const [figuras, setFiguras] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState(null);

  const carregar = useCallback(async () => {
    const lista = await listarFiguras(db);
    setFiguras(lista);
  }, [db]);

  // Recarrega a lista sempre que a tela ganha foco.
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  async function escolherImagem() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso às suas fotos para cadastrar a figura.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  }

  async function salvar() {
    if (!imagemUri) {
      Alert.alert('Atenção', 'Selecione uma imagem para a figura.');
      return;
    }
    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Informe uma descrição para a figura.');
      return;
    }

    try {
      await inserirFigura(db, { descricao, imagemUri });
      setDescricao('');
      setImagemUri(null);
      await carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a figura.');
    }
  }

  function confirmarExclusao(id) {
    Alert.alert('Excluir figura', 'Deseja realmente excluir esta figura?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirFigura(db, id);
          await carregar();
        },
      },
    ]);
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.form}>
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={estilos.previa} />
        ) : (
          <View style={[estilos.previa, estilos.previaVazia]}>
            <Text style={estilos.previaVaziaTexto}>Nenhuma imagem selecionada</Text>
          </View>
        )}

        <Botao
          titulo="Selecionar imagem"
          variante="secundario"
          aoPressionar={escolherImagem}
        />
        <View style={estilos.espaco} />

        <Text style={estilos.label}>Descrição</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex.: JavaScript"
          placeholderTextColor="#64748B"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Botao titulo="Salvar figura" aoPressionar={salvar} />
      </View>

      <Text style={estilos.tituloLista}>
        Figuras cadastradas ({figuras.length})
      </Text>

      <FlatList
        data={figuras}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FiguraItem figura={item} aoExcluir={confirmarExclusao} />
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhuma figura cadastrada ainda.</Text>
        }
      />
    </View>
  );
}
