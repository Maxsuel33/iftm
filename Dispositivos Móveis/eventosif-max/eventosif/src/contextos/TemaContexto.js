import { createContext, useContext, useMemo, useState } from 'react';

const TemaContexto = createContext(undefined);

export function TemaProvedor({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  // O objeto value é memorizado: só muda quando modoEscuro muda.
  // Assim, componentes que só precisam do tema não re-renderizam por mudanças
  // em outros contextos (usuário, inscrições etc.).
  const valor = useMemo(
    () => ({ temaEscuro: modoEscuro, setTemaEscuro: setModoEscuro }),
    [modoEscuro]
  );

  return (
    <TemaContexto.Provider value={valor}>
      {children}
    </TemaContexto.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContexto);
  if (ctx === undefined) {
    throw new Error('useTema deve ser usado dentro de um TemaProvedor');
  }
  return ctx;
}
