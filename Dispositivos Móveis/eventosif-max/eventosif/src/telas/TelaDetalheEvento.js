import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEventos } from '../contextos/EventosContexto';

export default function TelaDetalheEvento({ route }) {
  // Recebemos apenas o ID via route.params — nunca o objeto completo.
  // O evento é sempre buscado na fonte de verdade (EventosContexto),
  // garantindo que dados atualizados (ex.: vagas) sejam exibidos corretamente.
  const idEvento = route?.params?.idEvento;
  const { eventos } = useEventos();
  const evento = idEvento != null ? eventos.find((ev) => ev.id === idEvento) : undefined;

  if (!evento) {
    return (
      <View style={styles.containerVazio}>
        <Text style={styles.textoVazio}>
          {idEvento == null
            ? 'Nenhum evento selecionado. Volte e toque no título de um evento.'
            : 'Este evento não está mais disponível.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{evento.titulo}</Text>
      <Text style={styles.subtitulo}>
        {evento.local} · {evento.data}
      </Text>
      <Text style={styles.descricao}>{evento.descricao}</Text>
      <View style={styles.vagasBox}>
        <Text style={styles.vagasTexto}>
          Vagas disponíveis: {evento.vagas}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  containerVazio: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitulo: {
    fontSize: 14,
    color: '#777777',
  },
  descricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  vagasBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  vagasTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1565C0',
  },
  textoVazio: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
