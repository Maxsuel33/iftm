document.addEventListener("DOMContentLoaded", () => {
    iniciarJogo();
});

// 🟩 Função principal que organiza a execução das etapas
function iniciarJogo() {

    // 🟦 ETAPA 1 – Criar vetor de cartas de 1 até 27
    const vetorCartas = gerarCartas(27);
    console.log("Etapa 1 - Vetor de cartas:", vetorCartas);

    // 🟦 ETAPA 2 – Selecionar 4 cartas aleatórias e criar os pares
    const selecionadas = selecionarCartas(vetorCartas, 4);
    console.log("Etapa 2 - Cartas selecionadas:", selecionadas);

    const vetorPares = criarPares(selecionadas);
    console.log("Etapa 2 - Pares criados:", vetorPares);

    // 🟦 ETAPA 3 – Embaralhar os pares
    const vetorParesEmbaralhados = embaralhar(vetorPares);
    console.log("Etapa 3 - Vetor embaralhado:", vetorParesEmbaralhados);

    // 🟦 ETAPA 4 – Montar o tabuleiro com as imagens das cartas
    montarTabuleiro(vetorParesEmbaralhados);
}



//ETAPA 1 - Gerar vetor de cartas
function gerarCartas(total) {
    const cartas = [];
    for (let i = 1; i <= total; i++) {
        cartas.push(i);
    }
    return cartas;
}



//ETAPA 2 - Selecionar 4 cartas aleatórias
function selecionarCartas(cartas, quantidade) {
    const embaralhadas = embaralhar([...cartas]); // copia o vetor e embaralha
    return embaralhadas.slice(0, quantidade); // pega as 4 primeiras
}



//ETAPA 2 - Criar pares das cartas selecionadas
function criarPares(cartasSelecionadas) {
    const pares = [];
    cartasSelecionadas.forEach(carta => {
        pares.push(carta, carta); // duplica cada carta
    });
    return pares;
}



//ETAPA 3 - Embaralhar um vetor qualquer
function embaralhar(vetor) {
    return vetor.sort(() => Math.random() - 0.5);
}



//ETAPA 4 - Criar e exibir as imagens das cartas no tabuleiro
function montarTabuleiro(cartas) {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = ""; // limpa antes de montar

    cartas.forEach(num => {
        const img = document.createElement("img");
        img.src = `./img/carta${num}.png`; // caminho da imagem
        img.alt = `Carta ${num}`; // texto alternativo
        img.classList.add("carta"); // adiciona a classe CSS
        tabuleiro.appendChild(img); // adiciona a carta no tabuleiro
    });
}
