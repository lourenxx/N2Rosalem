import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// Estilos do componente Botao, separados do JSX.
export const estilos = StyleSheet.create({
  base: {
    paddingVertical: espacos.md,
    paddingHorizontal: espacos.lg,
    borderRadius: raio.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primario: {
    backgroundColor: cores.primaria,
  },
  secundario: {
    backgroundColor: cores.superficieClara,
  },
  perigo: {
    backgroundColor: cores.erro,
  },
  desabilitado: {
    opacity: 0.5,
  },
  texto: {
    fontSize: fontes.normal,
    fontWeight: '700',
    color: cores.fundo,
  },
  textoClaro: {
    color: cores.texto,
  },
});
