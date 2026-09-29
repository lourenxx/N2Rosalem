// Tela de Ranking: lista os 5 melhores recordes (via rankingRepository).
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import RankingItem from '../components/RankingItem';
import { listarTop5 } from '../database/rankingRepository';
import { estilos } from '../styles/ranking.styles';

export default function Ranking() {
  const db = useSQLiteContext();
  const [recordes, setRecordes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const lista = await listarTop5(db);
        setRecordes(lista);
      })();
    }, [db])
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>5 Melhores Resultados</Text>
      <FlatList
        data={recordes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RankingItem posicao={index + 1} recorde={item} />
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Nenhum recorde ainda. Jogue uma partida para aparecer aqui!
          </Text>
        }
      />
    </View>
  );
}
