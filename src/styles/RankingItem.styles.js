import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// Estilos do componente RankingItem.
export const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    padding: espacos.md,
    marginBottom: espacos.sm,
  },
  posicao: {
    fontSize: fontes.media,
    fontWeight: '800',
    color: cores.primaria,
    width: 44,
  },
  info: {
    flex: 1,
    marginHorizontal: espacos.sm,
  },
  jogador: {
    fontSize: fontes.normal,
    fontWeight: '600',
    color: cores.texto,
  },
  data: {
    fontSize: fontes.pequena,
    color: cores.textoSecundario,
  },
  pontuacao: {
    fontSize: fontes.media,
    fontWeight: '800',
    color: cores.sucesso,
  },
});
