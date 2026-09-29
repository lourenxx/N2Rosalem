// Botão reutilizável, com variantes de cor.
import { Pressable, Text } from 'react-native';
import { estilos } from '../styles/Botao.styles';

/**
 * @param {object} props
 * @param {string} props.titulo texto do botão
 * @param {() => void} props.aoPressionar
 * @param {'primario'|'secundario'|'perigo'} [props.variante]
 * @param {boolean} [props.desabilitado]
 */
export default function Botao({
  titulo,
  aoPressionar,
  variante = 'primario',
  desabilitado = false,
}) {
  // Botões secundário/perigo usam texto claro; o primário usa texto escuro.
  const textoClaro = variante !== 'primario';

  return (
    <Pressable
      onPress={aoPressionar}
      disabled={desabilitado}
      style={[
        estilos.base,
        estilos[variante],
        desabilitado && estilos.desabilitado,
      ]}
    >
      <Text style={[estilos.texto, textoClaro && estilos.textoClaro]}>
        {titulo}
      </Text>
    </Pressable>
  );
}
