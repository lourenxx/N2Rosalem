import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes } from '../theme/layout';

// Estilos da tela de menu.
export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: espacos.lg,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: fontes.titulo,
    fontWeight: '800',
    color: cores.primaria,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: fontes.media,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginBottom: espacos.xl,
  },
  botoes: {
    marginTop: espacos.lg,
  },
  espaco: {
    height: espacos.md,
  },
});
