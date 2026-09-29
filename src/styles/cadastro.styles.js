import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// Estilos da tela de cadastro de figuras.
export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: espacos.md,
  },
  form: {
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    padding: espacos.md,
    marginBottom: espacos.md,
  },
  label: {
    color: cores.textoSecundario,
    fontSize: fontes.pequena,
    marginBottom: espacos.xs,
  },
  input: {
    backgroundColor: cores.superficieClara,
    borderRadius: raio.sm,
    padding: espacos.md,
    color: cores.texto,
    fontSize: fontes.normal,
    marginBottom: espacos.md,
  },
  previa: {
    width: '100%',
    height: 160,
    borderRadius: raio.sm,
    backgroundColor: cores.superficieClara,
    marginBottom: espacos.md,
  },
  previaVazia: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  previaVaziaTexto: {
    color: cores.textoSecundario,
  },
  espaco: {
    height: espacos.sm,
  },
  tituloLista: {
    color: cores.texto,
    fontSize: fontes.media,
    fontWeight: '700',
    marginBottom: espacos.sm,
  },
  vazio: {
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: espacos.lg,
  },
});
