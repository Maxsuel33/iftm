// Configurações da API
const urlBaseFilmes = "https://api.themoviedb.org/3/discover/movie";
const urlGeneros = "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR";
const urlImagem = "https://image.tmdb.org/t/p/w500";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2ZjOTRhNjM3MzYxZjU4NWNkYmM1NzgzODk3NjM5NiIsIm5iZiI6MTc3NDg5NDAzNi44MTUsInN1YiI6IjY5Y2FiYmQ0MGE4ZWQ4ZDQ2YzgzOThjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MQNiQmprN0zMQZimQVeYOjtzWCzrNRuEIA1zO5OqNGw";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`
  }
};

// Elementos DOM
const catalogoDiv = document.getElementById("catalogo");
const genreFilter = document.getElementById("genreFilter");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfoSpan = document.getElementById("pageInfo");

// Modal
const modalOverlay = document.getElementById("modalOverlay");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalGenresDiv = document.getElementById("modalGenres");
const modalStarsSpan = document.getElementById("modalStars");
const modalVoteSpan = document.getElementById("modalVote");
const modalReleaseSpan = document.getElementById("modalRelease");
const modalOverviewSpan = document.getElementById("modalOverview");
const closeModalBtn = document.getElementById("closeModalBtn");

// Estado
let listaGeneros = [];
let paginaAtual = 1;
let totalPaginas = 1;
let generoSelecionado = "all";

// Buscar gêneros
async function buscarGeneros() {
  try {
    const resposta = await fetch(urlGeneros, options);
    if (!resposta.ok) throw new Error(`Erro ao buscar gêneros: ${resposta.status}`);
    const dados = await resposta.json();
    return dados.genres;
  } catch (error) {
    console.error("Erro ao carregar gêneros:", error);
    return [];
  }
}

// Preencher o filtro de gêneros
function preencherFiltroGeneros() {
  genreFilter.innerHTML = '<option value="all">Todos os gêneros</option>';
  listaGeneros.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero.id;
    option.textContent = genero.name;
    genreFilter.appendChild(option);
  });
}

// Atualizar paginação (botões e texto)
function atualizarPaginacao() {
  pageInfoSpan.textContent = `Página ${paginaAtual}`;
  prevBtn.disabled = paginaAtual === 1;
  nextBtn.disabled = paginaAtual === totalPaginas;
}

// Construir a URL com base na página e gênero
function construirUrl() {
  let url = `${urlBaseFilmes}?language=pt-BR&sort_by=popularity.desc&page=${paginaAtual}`;

  if (generoSelecionado !== "all") {
    const genreId = Number(generoSelecionado);
    if (!isNaN(genreId)) {
      url += `&with_genres=${genreId}`;
    }
  }

  return url;
}

// Carregar filmes da API
async function carregarFilmes() {
  try {
    catalogoDiv.innerHTML = `<div class="loading">Carregando filmes...</div>`;

    const url = construirUrl();
    console.log("Requisição para:", url);

    const resposta = await fetch(url, options);
    if (!resposta.ok) {
      throw new Error(`Erro TMDB: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    paginaAtual = dados.page;
    totalPaginas = Math.min(dados.total_pages, 500);
    const filmes = dados.results;

    if (listaGeneros.length === 0) {
      listaGeneros = await buscarGeneros();
      preencherFiltroGeneros();
    }

    renderizarFilmes(filmes);
    atualizarPaginacao();

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    console.error("Erro ao carregar filmes:", erro);
    catalogoDiv.innerHTML = `<p class="error"> Erro ao carregar filmes.</p>`;
  }
}

// Renderizar os cards (sem estrelas)
function renderizarFilmes(filmes) {
  if (!filmes.length) {
    catalogoDiv.innerHTML = `<p class="empty">Nenhum filme encontrado para este filtro. Tente outro gênero.</p>`;
    return;
  }

  catalogoDiv.innerHTML = "";

  filmes.forEach(filme => {
    const nomesGeneros = filme.genre_ids.map(id => {
      const genero = listaGeneros.find(g => g.id === id);
      return genero ? genero.name : "Desconhecido";
    });

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${filme.poster_path ? urlImagem + filme.poster_path : "https://via.placeholder.com/500x750?text=Sem+Imagem"}" alt="${filme.title}" loading="lazy">
      <div class="card-content">
        <h2>${filme.title}</h2>
        <div class="generos">
          ${nomesGeneros.map(g => `<span>${g}</span>`).join("")}
        </div>
        <div class="rating">
          ${filme.vote_average.toFixed(1)} / 10
        </div>
      </div>
    `;

    card.addEventListener("click", () => abrirModal(filme));
    catalogoDiv.appendChild(card);
  });
}

// Abrir modal com detalhes (sem estrelas)
function abrirModal(filme) {
  const nomesGeneros = filme.genre_ids.map(id => {
    const genero = listaGeneros.find(g => g.id === id);
    return genero ? genero.name : "Desconhecido";
  });

  modalPoster.src = filme.poster_path
    ? urlImagem + filme.poster_path
    : "https://via.placeholder.com/500x750?text=Sem+Poster";
  modalPoster.alt = filme.title;
  modalTitle.textContent = filme.title;

  modalGenresDiv.innerHTML = nomesGeneros
    .map(g => `<span class="genre-badge">${g}</span>`)
    .join("");

  // mostra a nota
  modalStarsSpan.textContent = "";
  modalVoteSpan.textContent = `${filme.vote_average.toFixed(1)} / 10`;

  modalReleaseSpan.textContent = filme.release_date
    ? new Date(filme.release_date).toLocaleDateString("pt-BR")
    : "Data não disponível";

  modalOverviewSpan.textContent = filme.overview && filme.overview.trim() !== ""
    ? filme.overview
    : "Sinopse não disponível para este filme.";

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Fechar modal
function fecharModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Event listeners
closeModalBtn.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) fecharModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) fecharModal();
});

// Paginação
prevBtn.addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarFilmes();
  }
});

nextBtn.addEventListener("click", () => {
  if (paginaAtual < totalPaginas) {
    paginaAtual++;
    carregarFilmes();
  }
});

// Filtro por gênero
genreFilter.addEventListener("change", () => {
  generoSelecionado = genreFilter.value;
  paginaAtual = 1;
  carregarFilmes();
});

// Inicialização
carregarFilmes();