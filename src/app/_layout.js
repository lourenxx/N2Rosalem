// Layout raiz do app (Expo Router).
// Aqui envolvemos TODAS as telas com o SQLiteProvider, para que qualquer
// tela consiga acessar o banco pelo hook useSQLiteContext().
// O onInit roda a migração (criação das tabelas) uma única vez.
import { SQLiteProvider } from 'expo-sqlite';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { migrarBanco } from '../database/schema';
import { cores } from '../theme/cores';

export default function LayoutRaiz() {
  return (
    <SQLiteProvider databaseName="jogo-memoria.db" onInit={migrarBanco}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.superficie },
          headerTintColor: cores.texto,
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Jogo da Memória' }} />
        <Stack.Screen name="cadastro" options={{ title: 'Cadastro de Figuras' }} />
        <Stack.Screen name="jogo" options={{ title: 'Partida' }} />
        <Stack.Screen name="ranking" options={{ title: 'Ranking' }} />
      </Stack>
    </SQLiteProvider>
  );
}
