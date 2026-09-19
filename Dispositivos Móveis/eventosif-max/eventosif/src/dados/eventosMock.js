// Dados fixos que simulam a resposta da API do campus.
// Mantemos o mesmo fluxo assíncrono (CARREGANDO → SUCESSO/FALHA com useReducer
// e cancelamento no desmonte) que teríamos com um fetch real — só a origem
// dos dados muda.
export const eventosMock = [
  {
    id: 1,
    titulo: 'Semana Nacional de Ciência e Tecnologia',
    local: 'Auditório Central',
    data: '2026-10-14',
    vagas: 40,
    descricao:
      'Palestras, minicursos e exposição de projetos dos cursos técnicos e superiores do campus.',
  },
  {
    id: 2,
    titulo: 'Maratona de Programação IFTM',
    local: 'Laboratório de Redes',
    data: '2026-09-27',
    vagas: 15,
    descricao:
      'Competição em equipes de até 3 participantes, com problemas de algoritmos e estruturas de dados.',
  },
  {
    id: 3,
    titulo: 'Feira de Extensão e Iniciação Científica',
    local: 'Ginásio Poliesportivo',
    data: '2026-11-05',
    vagas: 200,
    descricao:
      'Mostra aberta à comunidade com projetos de pesquisa, extensão e inovação desenvolvidos no campus.',
  },
  {
    id: 4,
    titulo: 'Oficina de React Native para Iniciantes',
    local: 'Lab. de Desenvolvimento Mobile',
    data: '2026-10-02',
    vagas: 25,
    descricao:
      'Introdução prática ao desenvolvimento de apps móveis multiplataforma usando React Native e Expo.',
  },
  {
    id: 5,
    titulo: 'Palestra: Gerenciamento de Estado em Apps Modernos',
    local: 'Auditório Central',
    data: '2026-09-30',
    vagas: 60,
    descricao:
      'Debate sobre estado local, de servidor, global e persistido, com exemplos e estudos de caso reais.',
  },
  {
    id: 6,
    titulo: 'Torneio Interclasses de Futsal',
    local: 'Quadra Poliesportiva',
    data: '2026-10-20',
    vagas: 80,
    descricao:
      'Torneio esportivo entre turmas do campus — aberto para inscrição de equipes e torcedores.',
  },
];
