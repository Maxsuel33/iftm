// js/game.js - Truco Mineiro (baralho adaptado, 27 cartas) - completo
document.addEventListener('DOMContentLoaded', () => {

  const nomeJogador = document.getElementById('nomeJogador'),
        timerSpan   = document.getElementById('timer'),
        diffSelect  = document.getElementById('dificuldade'),
        playerHand  = document.getElementById('playerHand'),
        opponentHand= document.getElementById('opponentHand'),
        tableCards  = document.getElementById('tableCards'),
        btnPause    = document.getElementById('btnPause'),
        btnPlay     = document.getElementById('btnPlay'),
        btnStop     = document.getElementById('btnStop'),
        btnExit     = document.getElementById('btnExit'),
        scoreNos    = document.getElementById('scoreNos'),
        scoreEles   = document.getElementById('scoreEles'),
        valorMaoEl  = document.getElementById('valorMao'),
        modal       = document.getElementById('gameModal'),
        modalTitle  = document.getElementById('modalTitle'),
        modalMsg    = document.getElementById('modalMessage'),
        modalBtn    = document.getElementById('modalBtn'),
        actionBar   = document.querySelector('.action-bar');

 
  const btnPedir   = document.createElement('button');
  const btnAceitar = document.createElement('button');
  const btnAumentar= document.createElement('button');
  const btnCorrer  = document.createElement('button');

  btnPedir.id = 'btnPedir'; btnPedir.className = 'action-btn truco';
  btnAceitar.id = 'btnAceitar'; btnAceitar.className = 'action-btn accept'; btnAceitar.textContent = 'ACEITAR';
  btnAumentar.id = 'btnAumentar'; btnAumentar.className = 'action-btn raise';
  btnCorrer.id = 'btnCorrer'; btnCorrer.className = 'action-btn correr'; btnCorrer.textContent = 'Correr';

  actionBar.innerHTML = '';
  actionBar.appendChild(btnPedir);
  actionBar.appendChild(btnAceitar);
  actionBar.appendChild(btnAumentar);
  actionBar.appendChild(btnCorrer);

    //Objeto pra facilitar a manipulação desses valores ai 

  const state = {
    maxTime: 15,
    timeLeft: 15,
    intervalId: null,
    pause: false,
    playing: false,
    deck: [],
    playerCartas: [],
    cpuCartas: [],
    roundsWonPlayer: 0,
    roundsWonCPU: 0,
    maoValor: 1,       // valor corrente da mão (1,3,6,9,12)
    proximoValor: 3,   // próximo aumento possível
    quemPediu: null,   // 'player' | 'cpu' | null
    roundWinner: null, // ultimo vencedor de rodada: 'player'|'cpu'|null
    starter: 'player'  // quem inicia a rodada atual
  };

  // Nome do jogador
  const usuarioLogado = sessionStorage.getItem('usuarioLogado') || localStorage.getItem('user') || 'Visitante';
  nomeJogador.textContent = usuarioLogado;


  //BARALHO (27 cartas)

  //Primeiros ranks
  const MANILHAS = [
    { rank: '4', suit: '♣' },
    { rank: '7', suit: '♥' },
    { rank: 'A', suit: '♠' },
    { rank: '7', suit: '♦' }
  ];

  // Ranks extras
  const EXTRA_RANKS = ['J','Q','K','A','2','3'];
  const NAIPES = ['♣','♥','♠','♦']; // paus, copas, espada, ouro

  const NAIPE_NAME = { '♣': 'paus', '♥': 'copas', '♠': 'espada', '♦': 'ouro' }; //Mapa

  function imgName(rank, suit) {
    return `${rank.toLowerCase()}_${NAIPE_NAME[suit]}.png`;
  }

  // peso/força das cartas (maior = mais forte)
  function pesoCartas(rank, suit) {

    if (rank === '4' && suit === '♣') return 100; // zap
    if (rank === '7' && suit === '♥') return 90;
    if (rank === 'A' && suit === '♠') return 80; // espadilha
    if (rank === '7' && suit === '♦') return 70;

    // ordem dos extras (da mais fraca à mais forte dentro deste grupo)
    // Vamos dar pesos: J=11, Q=12, K=13, A=14, 2=15, 3=16
    const order = { 'J': 11, 'Q': 12, 'K': 13, 'A': 14, '2': 15, '3': 16 };
    if (order[rank]) return order[rank];

    //(não deve acontecer)
    return 0;
  }

  // cria o deck seguindo sua regra (remove as cartas proibidas)
  function criarDeck() {
    const deck = [];

    MANILHAS.forEach(m => {
      deck.push({
        rank: m.rank,
        suit: m.suit,
        weight: pesoCartas(m.rank, m.suit),
        img: `img/${imgName(m.rank, m.suit)}`
      });
    });

    // adiciona os extras (J,Q,K,A,2,3) de TODOS os naipes
    EXTRA_RANKS.forEach(rank => {
      NAIPES.forEach(suit => {

        // evitar duplicar manilhas (A♠ já foi adicionada; 7♥ e 7♦ também)
        if (MANILHAS.some(m => m.rank === rank && m.suit === suit)) return;

        // cria a carta
        deck.push({
          rank,
          suit,
          weight: pesoCartas(rank, suit),
          img: `img/${imgName(rank, suit)}`
        });
      });
    });

    return embaralhar(deck);
  }

  // embaralha as carta
  function embaralhar(baralho) {
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
  return baralho;
}


    //executa as criações de cartas ao usuario e para a CPU de acordo com o seu nome no rank
  function criarCartaImg(card, faceUp = true) {

    const wrapper = document.createElement('div');
    wrapper.className = 'card';
    if (!faceUp) wrapper.classList.add('back');

    if (faceUp) {
      const img = document.createElement('img');
      img.src = card.img;
      img.alt = `${card.rank} de ${NAIPE_NAME[card.suit]}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.borderRadius = '6px';
      wrapper.appendChild(img);
    }
    return wrapper;
  }


  // entrega de cartas para os jogadores
  function distribuirMao() {
    state.deck = criarDeck();
    state.playerCartas = [];
    state.cpuCartas = [];

    // retirar e distribuir: garantir temos cartas suficientes
    for (let i = 0; i < 3; i++) {
      // se deck acabar , recria
      if (state.deck.length < 2) state.deck = state.deck.concat(criarDeck());
      state.playerCartas.push(state.deck.pop());
      state.cpuCartas.push(state.deck.pop());
    }

    // reset estado de rodada e apostas
    resetRoundState();
    resetApostaState();

    // decidir starter (por simplicidade sempre player; pode aleatorizar)
    state.starter = 'player';
    state.roundWinner = null;

    desenharCartas();
    tableCards.innerHTML = '<p class="table-message">Nova mão iniciada. Sua vez!</p>';
    startTimer();
    gerenciadorBtnJogo(false);
  }

  function desenharCartas() {
    playerHand.innerHTML = '';
    opponentHand.innerHTML = '';

    // jogador vê as cartas
    state.playerCartas.forEach((c, idx) => {
      const el = criarCartaImg(c, true);
      el.dataset.cardKey = `${c.rank}${c.suit}`; 

      el.addEventListener('click', () => onPlayerPlay(el.dataset.cardKey, el));
      playerHand.appendChild(el);
    });

    // CPU mostra versos
    state.cpuCartas.forEach(() => {
      const back = document.createElement('div');
      back.className = 'card back';
      opponentHand.appendChild(back);
    });
  }

  // -------------------------
  // Jogada do jogador
  // -------------------------
  function onPlayerPlay(cardKey, cardEl) { // Recebe a chave única em vez do índice
    if (!state.playing || state.pause) return;
    if (state.quemPediu) return;
    if (tableCards.dataset.playerPlayed === 'true') return;

    // NOVO: Encontrar o índice correto da carta na mão pelo identificador
    const cardIndex = state.playerCartas.findIndex(c => `${c.rank}${c.suit}` === cardKey);
    
    if (cardIndex === -1) {
        // Carta não encontrada (já jogada ou índice inválido). Previne o erro.
        return; 
    }
    
    // Pega carta do jogador
    const card = state.playerCartas.splice(cardIndex, 1)[0]; 
    
    // remove o elemento clicado
    if (cardEl && cardEl.parentElement) cardEl.parentElement.removeChild(cardEl);

    // joga na mesa
    cartaNaMesa('player', card);
    tableCards.dataset.playerPlayed = 'true';

    // se cpu já tinha jogado, avaliar; se não, cpu responde
    const plays = JSON.parse(tableCards.dataset.plays || '[]');
    if (plays.length === 2 && plays[0].who === 'cpu') {
      setTimeout(avaliarMao, 600);
    } else {
      setTimeout(() => cpuRespond(card), 700);
    }
  }

  // coloca carta na mesa 
  function cartaNaMesa(who, card) {
    // monta elemento com imagem
    const el = criarCartaImg(card, true);
    el.style.transform = `rotate(${Math.random() * 16 - 8}deg)`;
    el.classList.add(who === 'cpu' ? 'cpu-card' : 'player-card');

    // adicionar ao centro (limpa antes)
    // para exibir também as duas cartas, podemos empilhar com margem
    const current = tableCards.querySelectorAll('.card');
    if (current.length >= 2) tableCards.innerHTML = '';
    tableCards.appendChild(el);

    // guarda jogada
    const plays = JSON.parse(tableCards.dataset.plays || '[]');
    plays.push({ who, card });
    tableCards.dataset.plays = JSON.stringify(plays);
  }

  // -------------------------
  // CPU: decidir carta e jogada
  // -------------------------
  function calcularForcaMao(cards) {
    if (!cards || cards.length === 0) return 0;
    const maxW = Math.max(...cards.map(c => c.weight));
    // normaliza 11..100 -> 0..100 roughly
    const normalized = Math.min(100, Math.max(0, (maxW - 10) * (100 / 90)));
    return normalized;
  }


  // Estrategia da CPU, quase pronta, ainda analisando algumas jogadas com confusão

  function cpuRespond(playerCard = null) {
    // se não há cartas, apenas avalia
    if (state.cpuCartas.length === 0) {
      if (playerCard) setTimeout(avaliarMao, 300);
      return;
    }

    let indiceCPU = -1;

    if (playerCard) {
      // tenta jogar a carta mais fraca que vença
      let bestIdx = -1, bestWeight = Infinity;
      for (let i = 0; i < state.cpuCartas.length; i++) {
        const c = state.cpuCartas[i];
        if (c.weight >= playerCard.weight && c.weight < bestWeight) {
          bestWeight = c.weight;
          bestIdx = i;
        }
      }
      if (bestIdx !== -1) indiceCPU = bestIdx;
      else {
        // não vence: jogar a carta mais fraca para poupar
        const minW = Math.min(...state.cpuCartas.map(c => c.weight));
        indiceCPU = state.cpuCartas.findIndex(c => c.weight === minW);
      }
    } else {
      // CPU começa: joga a carta mais fraca para guardar
      const minW = Math.min(...state.cpuCartas.map(c => c.weight));
      indiceCPU = state.cpuCartas.findIndex(c => c.weight === minW);
    }

    const cpuCard = state.cpuCartas.splice(indiceCPU, 1)[0];

    // remover um verso do oponenteHand (visual)
    const backEl = opponentHand.querySelector('.card.back');
    if (backEl) backEl.remove();

    cartaNaMesa('cpu', cpuCard);

    if (playerCard) {
      setTimeout(avaliarMao, 700);
    } else {
      // CPU começou -> jogador deve responder
      tableCards.dataset.playerPlayed = "false";
      tableCards.innerHTML += '<p class="table-message">Sua vez de responder!</p>';
      state.timeLeft = state.maxTime;
      startTimer();
    }
  }

  // -------------------------
  // Avaliar rodada / encerrar mão
  // -------------------------
  function avaliarMao() {
    const plays = JSON.parse(tableCards.dataset.plays || '[]');
    if (plays.length < 2) return;

    // identificar quem jogou qual (pode ter ordem variada)
    const pPlay = plays.find(p => p.who === 'player');
    const cPlay = plays.find(p => p.who === 'cpu');

    if (!pPlay || !cPlay) return;

    const weightP = pPlay.card.weight;
    const weightC = cPlay.card.weight;

    let winner = null;
    let message = '';

    if (weightP === weightC) {
      message = 'Empate na rodada!';
      // empate (canga) não soma ponto de rodada aqui
    } else if (weightP > weightC) {
      winner = 'player';
      state.roundsWonPlayer++;
      message = `Você venceu a rodada (${pPlay.card.rank}${pPlay.card.suit} > ${cPlay.card.rank}${cPlay.card.suit})`;
    } else {
      winner = 'cpu';
      state.roundsWonCPU++;
      message = `CPU venceu a rodada (${cPlay.card.rank}${cPlay.card.suit} > ${pPlay.card.rank}${pPlay.card.suit})`;
    }

    state.roundWinner = winner;
    mostrarResultado(message);

    // aguarda para limpar a mesa e seguir
    setTimeout(() => {
      // se alguém já ganhou 2 rodadas ou não há cartas (fim das 3 rodadas), encerra a mão
      if (state.roundsWonPlayer >= 2 || state.roundsWonCPU >= 2 || state.playerCartas.length === 0) {
        endHand();
        return;
      }

      // limpa estado da rodada (prepara próxima)
      resetRoundState(); // também zera dataset.plays e playerPlayed

      // quem venceu começa a próxima; se empate, starter permanece
      if (state.roundWinner === 'cpu') {
        // CPU começa
        cpuRespond();
      } else {
        // Player começa
        tableCards.innerHTML = '<p class="table-message">Sua vez!</p>';
        state.timeLeft = state.maxTime;
        startTimer();
      }

    }, 1000);
  }

  function endHand() {
    let vencedor = null;
    if (state.roundsWonPlayer > state.roundsWonCPU) vencedor = 'player';
    else if (state.roundsWonCPU > state.roundsWonPlayer) vencedor = 'cpu';

    if (vencedor === 'player') {
      scoreNos.textContent = Number(scoreNos.textContent) + state.maoValor;
      showModal('Mão encerrada', `Você ganhou a mão! +${state.maoValor} ponto(s).`);
    } else if (vencedor === 'cpu') {
      scoreEles.textContent = Number(scoreEles.textContent) + state.maoValor;
      showModal('Mão encerrada', `CPU ganhou a mão! +${state.maoValor} ponto(s).`);
    } else {
      showModal('Mão encerrada', 'Empate na mão. Ninguém pontua.');
    }

    // reset aposta e preparar próxima mão
    resetApostaState();
    setTimeout(() => {
      distribuirMao();
    }, 1500);
  }

  // -------------------------
  // TRUCO: pedir / aceitar / aumentar / correr
  // -------------------------
  function aumentarValor(valorAtual) {
    if (valorAtual === 1) return 3;
    if (valorAtual === 3) return 6;
    if (valorAtual === 6) return 9;
    if (valorAtual === 9) return 12;
    return 12;
  }

  function pedirAumento(quem) {
    if (state.proximoValor > 12) return;
    state.quemPediu = quem;
    mostrarResultado(`${quem === 'player' ? 'Você' : 'CPU'} pediu ${state.proximoValor}!`);
    if (quem === 'player') {
      // bloqueia jogadas do player até a CPU responder
      gerenciadorBtnJogo(true); // mostra ACEITAR/AUMENTAR/CORRER
      cpuResponderAposta();
    } else {
      // CPU pediu -> jogador deve responder (mostrar botões)
      gerenciadorBtnJogo(true);
      btnAumentar.textContent = `AUMENTAR PARA ${aumentarValor(state.proximoValor)}!`;
    }
  }

  function resetApostaState() {
    state.maoValor = 1;
    state.proximoValor = 3;
    state.quemPediu = null;
    valorMaoEl.textContent = String(state.maoValor);
    btnPedir.textContent = 'PEDIR TRUCO';
    gerenciadorBtnJogo(false);
  }

  // botões
  btnPedir.addEventListener('click', () => {
    if (!state.playing || state.quemPediu) return;
    // iniciar pedido
    state.proximoValor = state.maoValor === 1 ? 3 : state.proximoValor;
    pedirAumento('player');
  });

  btnAceitar.addEventListener('click', () => {
    if (!state.playing || !state.quemPediu) return;
    state.maoValor = state.proximoValor;
    valorMaoEl.textContent = String(state.maoValor);
    state.proximoValor = aumentarValor(state.maoValor);
    state.quemPediu = null;
    gerenciadorBtnJogo(false);
    btnPedir.textContent = `PEDIR ${state.proximoValor}!`;
    mostrarResultado(`Aposta aceita! Mão vale ${state.maoValor}.`);
    // volta timer normalmente
    state.timeLeft = state.maxTime;
  });

  btnAumentar.addEventListener('click', () => {
    if (!state.playing || !state.quemPediu) return;
    // jogador tenta aumentar (contra-pedir)
    // se já pediu o jogador, isso faz pedido para próximo valor
    state.proximoValor = aumentarValor(state.proximoValor);
    pedirAumento('player'); // agora quemPediu será 'player'
  });

  btnCorrer.addEventListener('click', () => {
    if (!state.playing) return;
    const valorPerdido = state.quemPediu ? state.maoValor : 1;
    // Se o player correr, CPU pontua
    scoreEles.textContent = String(Number(scoreEles.textContent) + valorPerdido);
    showModal('Você correu', `Você desistiu. CPU ganhou ${valorPerdido} ponto(s).`);
    resetApostaState();
    setTimeout(() => distribuirMao(), 700);
  });

  // CPU decide sobre a aposta
  function cpuResponderAposta() {
    const forca = calcularForcaMao(state.cpuCartas);
    const valorAposta = state.proximoValor;
    let acao = 'CORRER'; // ação padrão

    if (forca >= 85 && valorAposta <= 3) acao = 'AUMENTAR';
    else if (forca >= 65 && valorAposta < 12) acao = 'ACEITAR';
    else if (forca >= 40 && valorAposta <= 3) acao = 'ACEITAR';
    else if (Math.random() < 0.08 && valorAposta < 12) acao = (Math.random() < 0.5 ? 'AUMENTAR' : 'ACEITAR');

    setTimeout(() => {
      if (acao === 'ACEITAR') {
        btnAceitar.click();
      } else if (acao === 'AUMENTAR') {
        state.proximoValor = aumentarValor(valorAposta);
        pedirAumento('cpu');
      } else {
        // CORRER -> player ganha pontos do valor anterior (state.maoValor)
        scoreNos.textContent = String(Number(scoreNos.textContent) + state.maoValor);
        showModal('CPU correu', `CPU desistiu. Você ganhou ${state.maoValor} ponto(s).`);
        resetApostaState();
        setTimeout(() => distribuirMao(), 700);
      }
    }, 1200);
  }

  /* se essa função abaixo for verdadeira a CPU pediu truco e cabe a usuario escolher entre corre, aceitar e aumentar,
    se for falsa significa que o jogo segue em andamento, e/ou a vez do jogador pedir truco */

  function gerenciadorBtnJogo(respostaNecessaria) {
    if (respostaNecessaria) {
      btnPedir.style.display = 'none';
      btnAceitar.style.display = 'inline-block';
      btnAumentar.style.display = state.proximoValor >= 12 ? 'none' : 'inline-block';
      btnCorrer.style.display = 'inline-block';
    } else {
      btnPedir.style.display = state.maoValor >= 12 ? 'none' : 'inline-block';
      btnPedir.textContent = state.maoValor === 1 ? 'PEDIR TRUCO' : `PEDIR ${state.proximoValor}!`;
      btnAceitar.style.display = 'none';
      btnAumentar.style.display = 'none';
      btnCorrer.style.display = 'inline-block';
    }
  }

  // -------------------------
  // TIMER e controles
  // -------------------------
  function startTimer() {
    clearInterval(state.intervalId);
    state.intervalId = setInterval(() => {
      if (state.pause || !state.playing || state.quemPediu) return;
      state.timeLeft--;
      timerSpan.textContent = String(state.timeLeft);
      if (state.timeLeft <= 0) {
        autoPlayTimeout();
      }
    }, 1000);
  }


  //antigo autoJogada 

  //garante que o jogo continue mesmo se o jogador não fizer uma jogada dentro do tempo estipulado.
  function autoPlayTimeout() {
  clearInterval(state.intervalId);
  // pega a primeira carta *sem depender de .card*
  const firstCardEl = playerHand.children[0];
  if (state.playerCartas.length > 0 && firstCardEl) {
    // Força a jogada mesmo que quemPediu, paused, etc.
    // Alteração: passar a chave da carta (dataset.cardKey) em vez de 0
    onPlayerPlay(firstCardEl.dataset.cardKey, firstCardEl);
  }
  state.timeLeft = state.maxTime;
  startTimer();
}


  btnPause.addEventListener('click', () => {
    if (!state.playing) return;
    state.pause = true;
    btnPause.style.display = 'none';
    btnPlay.style.display = 'inline-block';
    showModal('Pausado', 'Jogo pausado.');
  });
  btnPlay.addEventListener('click', () => {
    state.pause = false;
    btnPause.style.display = 'inline-block';
    btnPlay.style.display = 'none';
    modal.classList.add('hidden');
  });
  btnStop.addEventListener('click', () => {
    if (confirm('Reiniciar partida?')) {
      resetScores();
      distribuirMao();
    }
  });
  btnExit.addEventListener('click', () => {
    if (confirm('Sair do jogo e voltar ao login?')) {
      sessionStorage.removeItem('usuarioLogado');
      window.location.href = 'index.html';
    }
  });

  modalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  function showModal(title, msg) {
    modalTitle.textContent = title;
    modalMsg.textContent = msg;
    modal.classList.remove('hidden');
  }
  function mostrarResultado(msg) {
    tableCards.innerHTML = `<p class="table-message">${msg}</p>`;
    setTimeout(() => {
      // se mesa sem jogadas, mostrar dica
      const plays = JSON.parse(tableCards.dataset.plays || '[]');
      if ((!plays || plays.length === 0) && state.playerCartas.length > 0) {
        tableCards.innerHTML = '<p class="table-message">Sua vez...</p>';
      }
    }, 1000);
  }

  function resetScores() {
    scoreNos.textContent = '0';
    scoreEles.textContent = '0';
    resetApostaState();
  }

  function resetRoundState() {
    state.roundsWonPlayer = 0;
    state.roundsWonCPU = 0;
    tableCards.dataset.playerPlayed = "false";
    tableCards.dataset.plays = JSON.stringify([]);
    tableCards.innerHTML = '<p class="table-message">Sua vez...</p>';
    state.timeLeft = state.maxTime;
    timerSpan.textContent = String(state.timeLeft);
  }

  // --------------------------------
  // Ajuste dificuldade (tempo)
  // --------------------------------
  diffSelect.addEventListener('change', () => {
    const d = diffSelect.value;
    if (d === 'facil') state.maxTime = 30;
    else if (d === 'medio') state.maxTime = 15;
    else state.maxTime = 8;
    state.timeLeft = state.maxTime;
    timerSpan.textContent = String(state.timeLeft);
  });

  // -------------------------
  // Iniciar jogo
  // -------------------------
  function startGame() {
    diffSelect.dispatchEvent(new Event('change'));
    state.playing = true;
    state.pause = false;
    resetScores();
    distribuirMao();
    startTimer();
  }


  startGame();

});
