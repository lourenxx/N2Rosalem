import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes } from '../theme/layout';

// Estilos da tela de ranking.
export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: espacos.md,
  },
  titulo: {
    fontSize: fontes.media,
    fontWeight: '700',
    color: cores.texto,
    marginBottom: espacos.md,
  },
  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: espacos.xl,
  },
});
