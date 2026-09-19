import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useEventos } from './EventosContexto';

// Guardamos apenas os IDs das inscrições — não os objetos de evento inteiros.
// A lista exibida é sempre derivada cruzando esses IDs com a fonte de verdade
// (EventosContexto), evitando duplicação de dados e o bug de cópias desatualizadas.
const InscricoesContexto = createContext(undefined);

export function InscricoesProvedor({ children }) {
  const [idsInscritos, setIdsInscritos] = useState([]);
  const { eventos } = useEventos();

  const inscrever = useCallback((idEvento) => {
    setIdsInscritos((anteriores) => {
      if (anteriores.includes(idEvento)) return anteriores;
      return [...anteriores, idEvento];
    });
  }, []);

  const cancelarInscricao = useCallback((idEvento) => {
    setIdsInscritos((anteriores) => anteriores.filter((id) => id !== idEvento));
  }, []);

  const estaInscrito = useCallback(
    (idEvento) => idsInscritos.includes(idEvento),
    [idsInscritos]
  );

  const listaInscricoes = useMemo(
    () => eventos.filter((ev) => idsInscritos.includes(ev.id)),
    [eventos, idsInscritos]
  );

  const valor = useMemo(
    () => ({
      inscricoes: listaInscricoes,
      totalInscricoes: idsInscritos.length,
      inscrever,
      cancelarInscricao,
      estaInscrito,
    }),
    [listaInscricoes, idsInscritos.length, inscrever, cancelarInscricao, estaInscrito]
  );

  return (
    <InscricoesContexto.Provider value={valor}>
      {children}
    </InscricoesContexto.Provider>
  );
}

export function useInscricoes() {
  const ctx = useContext(InscricoesContexto);
  if (ctx === undefined) {
    throw new Error('useInscricoes deve ser usado dentro de um InscricoesProvedor');
  }
  return ctx;
}
