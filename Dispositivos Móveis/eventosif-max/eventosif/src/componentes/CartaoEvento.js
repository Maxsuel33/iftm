import { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// memo evita re-renderizar cartões cujas props não mudaram.
// Ex.: alternar o tema não deve re-renderizar todos os cartões da lista.
function CartaoEvento({ evento, jaInscrito, aoInscrever, aoAbrir }) {
  console.log('[render] CartaoEvento', evento.id);

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo} onPress={aoAbrir}>
        {evento.titulo}
      </Text>
      <Text style={styles.info}>
        {evento.local} · {evento.data}
      </Text>
      <TouchableOpacity
        style={[styles.botao, jaInscrito && styles.botaoInscrito]}
        onPress={aoInscrever}
        disabled={jaInscrito}
        activeOpacity={0.75}
      >
        <Text style={styles.botaoTexto}>
          {jaInscrito ? '✓ Inscrito' : 'Inscrever-se'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(CartaoEvento);

const styles = StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 6,
    backgroundColor: '#FAFAFA',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  info: {
    fontSize: 13,
    color: '#777777',
  },
  botao: {
    marginTop: 4,
    backgroundColor: '#1565C0',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  botaoInscrito: {
    backgroundColor: '#A5D6A7',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
