import { StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { espacos, fontes, raio } from '../theme/layout';

// Estilos da tela do jogo.
export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: espacos.md,
  },
  placar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    padding: espacos.md,
    marginBottom: espacos.md,
  },
  placarItem: {
    alignItems: 'center',
  },
  placarLabel: {
    color: cores.textoSecundario,
    fontSize: fontes.pequena,
  },
  placarValor: {
    fontSize: fontes.media,
    fontWeight: '800',
    color: cores.texto,
  },
  placarErros: {
    color: cores.erro,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  // Mensagens quando não há figuras suficientes.
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espacos.lg,
  },
  aviso: {
    color: cores.texto,
    fontSize: fontes.media,
    textAlign: 'center',
    marginBottom: espacos.lg,
  },
  // Painel de resultado final.
  resultado: {
    marginTop: espacos.lg,
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    padding: espacos.lg,
    alignItems: 'center',
  },
  resultadoTitulo: {
    fontSize: fontes.grande,
    fontWeight: '800',
    color: cores.sucesso,
    marginBottom: espacos.sm,
  },
  resultadoTexto: {
    color: cores.texto,
    fontSize: fontes.normal,
    marginBottom: espacos.xs,
  },
  input: {
    width: '100%',
    backgroundColor: cores.superficieClara,
    borderRadius: raio.sm,
    padding: espacos.md,
    color: cores.texto,
    fontSize: fontes.normal,
    marginVertical: espacos.md,
  },
  acoes: {
    marginTop: espacos.md,
  },
  espaco: {
    height: espacos.sm,
  },
});
