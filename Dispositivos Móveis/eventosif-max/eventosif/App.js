import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TemaProvedor } from './src/contextos/TemaContexto';
import { SessaoProvedor } from './src/contextos/SessaoContexto';
import { EventosProvedor } from './src/contextos/EventosContexto';
import { InscricoesProvedor } from './src/contextos/InscricoesContexto';
import TelaEventos from './src/telas/TelaEventos';
import TelaDetalheEvento from './src/telas/TelaDetalheEvento';
import TelaMinhasInscricoes from './src/telas/TelaMinhasInscricoes';

const NavAbas = createBottomTabNavigator();
const PilhaEventos = createNativeStackNavigator();

// "Detalhe" fica dentro do Stack Navigator e nunca aparece como aba direta.
// Dessa forma, route.params.idEvento sempre chega preenchido — se estivesse
// como aba no Bottom Tab, o usuário poderia tocá-la sem passar pelo navigate,
// e route.params chegaria undefined.
function FluxoEventos() {
  return (
    <PilhaEventos.Navigator>
      <PilhaEventos.Screen
        name="ListaEventos"
        component={TelaEventos}
        options={{ title: 'Eventos do Campus' }}
      />
      <PilhaEventos.Screen
        name="Detalhe"
        component={TelaDetalheEvento}
        options={{ title: 'Detalhes' }}
      />
    </PilhaEventos.Navigator>
  );
}

// Cada preocupação tem seu próprio provedor: quem só consome tema não
// re-renderiza quando o usuário muda, e vice-versa.
export default function App() {
  return (
    <TemaProvedor>
      <SessaoProvedor>
        <EventosProvedor>
          <InscricoesProvedor>
            <NavigationContainer>
              <NavAbas.Navigator>
                <NavAbas.Screen
                  name="Eventos"
                  component={FluxoEventos}
                  options={{ headerShown: false }}
                />
                <NavAbas.Screen
                  name="Inscricoes"
                  component={TelaMinhasInscricoes}
                  options={{ title: 'Minhas Inscrições' }}
                />
              </NavAbas.Navigator>
            </NavigationContainer>
          </InscricoesProvedor>
        </EventosProvedor>
      </SessaoProvedor>
    </TemaProvedor>
  );
}
