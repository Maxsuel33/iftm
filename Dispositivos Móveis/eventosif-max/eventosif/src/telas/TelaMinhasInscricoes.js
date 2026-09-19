import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useInscricoes } from '../contextos/InscricoesContexto';

export default function TelaMinhasInscricoes() {
  // Os dados vêm do InscricoesContexto — não há useState local aqui.
  // Inscrever na aba de Eventos já aparece automaticamente nesta lista.
  const { inscricoes, cancelarInscricao } = useInscricoes();

  console.log('[render] TelaMinhasInscricoes');

  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>
        Minhas inscrições ({inscricoes.length})
      </Text>

      {inscricoes.length === 0 && (
        <Text style={styles.textoVazio}>
          Você ainda não se inscreveu em nenhum evento.
        </Text>
      )}

      <FlatList
        data={inscricoes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.linha}>
            <View style={styles.infoEvento}>
              <Text style={styles.tituloEvento}>{item.titulo}</Text>
              <Text style={styles.dataEvento}>{item.data}</Text>
            </View>
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => cancelarInscricao(item.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  cabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  textoVazio: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoEvento: {
    flex: 1,
    marginRight: 10,
  },
  tituloEvento: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  dataEvento: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  botaoCancelar: {
    backgroundColor: '#E53935',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  botaoCancelarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
