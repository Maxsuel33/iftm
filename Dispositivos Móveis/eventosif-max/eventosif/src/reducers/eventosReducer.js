// Redutor puro: sem efeitos colaterais, sem fetch, sem Date.now().
// Antes eram quatro booleanos independentes (eventos, carregando, erro, enviado),
// o que permitia combinações sem sentido — como carregando=true junto com erro preenchido.
// Agora um único campo `status` garante que só um estado é verdadeiro por vez.
export const estadoInicial = {
  status: 'carregando', // 'carregando' | 'sucesso' | 'falha'
  eventos: [],
  mensagemErro: null,
};

export function eventosReducer(estado, acao) {
  switch (acao.tipo) {
    case 'CARREGANDO':
      return { status: 'carregando', eventos: [], mensagemErro: null };

    case 'SUCESSO':
      return { status: 'sucesso', eventos: acao.payload, mensagemErro: null };

    case 'FALHA':
      return { status: 'falha', eventos: [], mensagemErro: acao.payload };

    default:
      return estado;
  }
}
