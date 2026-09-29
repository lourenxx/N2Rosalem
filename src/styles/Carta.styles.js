import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// A grade tem 3 colunas; cada carta ocupa ~1/3 da largura.
// Usamos aspectRatio 1 para manter as cartas quadradas.
export const estilos = StyleSheet.create({
  container: {
    width: '31%',
    aspectRatio: 1,
    margin: '1%',
  },
  carta: {
    flex: 1,
    borderRadius: raio.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacos.xs,
    overflow: 'hidden',
  },
  cartaFechada: {
    backgroundColor: cores.primariaEscura,
  },
  cartaVirada: {
    backgroundColor: cores.superficie,
    borderWidth: 2,
    borderColor: cores.primaria,
  },
  interrogacao: {
    fontSize: fontes.titulo,
    fontWeight: '800',
    color: cores.branco,
  },
  imagem: {
    width: '100%',
    flex: 1,
    borderRadius: raio.sm,
  },
  descricao: {
    marginTop: espacos.xs,
    fontSize: fontes.pequena,
    color: cores.texto,
    textAlign: 'center',
  },
});
