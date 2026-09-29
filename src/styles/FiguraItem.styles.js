import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// Estilos do componente FiguraItem.
export const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    padding: espacos.sm,
    marginBottom: espacos.sm,
  },
  imagem: {
    width: 56,
    height: 56,
    borderRadius: raio.sm,
    backgroundColor: cores.superficieClara,
  },
  descricao: {
    flex: 1,
    marginHorizontal: espacos.md,
    fontSize: fontes.normal,
    color: cores.texto,
  },
  botaoExcluir: {
    backgroundColor: cores.erro,
    paddingVertical: espacos.xs,
    paddingHorizontal: espacos.md,
    borderRadius: raio.sm,
  },
  textoExcluir: {
    color: cores.branco,
    fontWeight: '700',
    fontSize: fontes.pequena,
  },
});
