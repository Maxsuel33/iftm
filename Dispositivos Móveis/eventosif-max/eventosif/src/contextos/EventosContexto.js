import { createContext, useContext, useEffect, useReducer } from 'react';
import { eventosReducer, estadoInicial } from '../reducers/eventosReducer';
import { eventosMock } from '../dados/eventosMock';

const EventosContexto = createContext(undefined);

export function EventosProvedor({ children }) {
  const [estado, despachar] = useReducer(eventosReducer, estadoInicial);

  useEffect(() => {
    // Simulamos o fluxo assíncrono que teríamos com um fetch real:
    // CARREGANDO → SUCESSO, via useReducer, com cancelamento no desmonte.
    // Os dados vêm do mock local porque a API do campus não está disponível
    // neste ambiente de desenvolvimento.
    let desmontado = false;

    despachar({ tipo: 'CARREGANDO' });

    const timer = setTimeout(() => {
      if (desmontado) return;
      despachar({ tipo: 'SUCESSO', payload: eventosMock });
    }, 500);

    return () => {
      desmontado = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <EventosContexto.Provider value={estado}>
      {children}
    </EventosContexto.Provider>
  );
}

export function useEventos() {
  const ctx = useContext(EventosContexto);
  if (ctx === undefined) {
    throw new Error('useEventos deve ser usado dentro de um EventosProvedor');
  }
  return ctx;
}
