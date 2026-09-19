import { useState } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet,
} from 'react-native';
import { useTema } from '../contextos/TemaContexto';
import { useEventos } from '../contextos/EventosContexto';
import { useInscricoes } from '../contextos/InscricoesContexto';
import CartaoEvento from '../componentes/CartaoEvento';

export default function TelaEventos({ navigation }) {
  // Esta tela só consome TemaContexto e EventosContexto —
  // uma mudança em SessaoContexto não a re-renderiza mais.
  const { temaEscuro } = useTema();
  const { status, eventos, mensagemErro } = useEventos();
  const { totalInscricoes, inscrever, estaInscrito } = useInscricoes();

  const [termoBusca, setTermoBusca] = useState('');
  const [ultimoInscritoId, setUltimoInscritoId] = useState(null);

  // Estado derivado calculado na renderização — sem useEffect de sincronização.
  const eventosFiltrados = eventos.filter((ev) =>
    ev.titulo.toLowerCase().includes(termoBusca.toLowerCase())
  );
  const eventoConfirmado = eventos.find((ev) => ev.id === ultimoInscritoId);

  function handleInscrever(evento) {
    inscrever(evento.id);
    setUltimoInscritoId(evento.id);
  }

  console.log('[render] TelaEventos');

  const corFundo = temaEscuro ? '#121212' : '#F5F5F5';
  const corTexto = temaEscuro ? '#EEEEEE' : '#1A1A1A';

  return (
    <View style={[styles.container, { backgroundColor: corFundo }]}>
      <Text style={[styles.contador, { color: corTexto }]}>
        Total de inscrições: {totalInscricoes}
      </Text>

      <TextInput
        style={styles.campoBusca}
        value={termoBusca}
        onChangeText={setTermoBusca}
        placeholder="Pesquisar evento..."
        placeholderTextColor="#AAAAAA"
      />

      {status === 'carregando' && (
        <ActivityIndicator size="large" color="#1565C0" style={styles.loader} />
      )}

      {status === 'falha' && (
        <Text style={styles.textoErro}>Erro ao carregar: {mensagemErro}</Text>
      )}

      {eventoConfirmado && (
        <Text style={styles.textoSucesso}>
          ✓ Inscrição realizada: {eventoConfirmado.titulo}
        </Text>
      )}

      {status === 'sucesso' && (
        <FlatList
          data={eventosFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CartaoEvento
              evento={item}
              jaInscrito={estaInscrito(item.id)}
              aoInscrever={() => handleInscrever(item)}
              aoAbrir={() => navigation.navigate('Detalhe', { idEvento: item.id })}
            />
          )}
          ListEmptyComponent={
            <Text style={{ color: corTexto, textAlign: 'center', marginTop: 24 }}>
              Nenhum evento encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contador: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  campoBusca: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  loader: {
    marginTop: 32,
  },
  textoErro: {
    color: '#C62828',
    marginBottom: 8,
  },
  textoSucesso: {
    color: '#2E7D32',
    marginBottom: 8,
  },
});
