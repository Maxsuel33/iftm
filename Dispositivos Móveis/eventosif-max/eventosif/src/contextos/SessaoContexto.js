import { createContext, useContext, useMemo, useState } from 'react';

const SessaoContexto = createContext(undefined);

export function SessaoProvedor({ children }) {
  const [usuario, setUsuario] = useState({ nome: 'Visitante', matricula: null });

  // useMemo evita recriar o objeto value a cada render do provedor,
  // impedindo re-renderizações desnecessárias nos consumidores.
  const valor = useMemo(() => ({ usuario, setUsuario }), [usuario]);

  return (
    <SessaoContexto.Provider value={valor}>
      {children}
    </SessaoContexto.Provider>
  );
}

export function useSessao() {
  const ctx = useContext(SessaoContexto);
  if (ctx === undefined) {
    throw new Error('useSessao deve ser usado dentro de um SessaoProvedor');
  }
  return ctx;
}
