(function(){
  const acervo = [
    {autor:"Machado de Assis", titulo:"Dom Casmurro", isbn:"9788535902778"},
    {autor:"Machado de Assis", titulo:"Memórias Póstumas de Brás Cubas", isbn:"9788535910216"},
    {autor:"Clarice Lispector", titulo:"A Hora da Estrela", isbn:"9788532511724"},
    {autor:"José de Alencar", titulo:"Iracema", isbn:"9788582850356"}
  ];

  const $ = (id) => document.getElementById(id);
  const form = $("searchForm");
  const autorInput = $("autor"), tituloInput = $("titulo"), isbnInput = $("isbn");
  const isbnField = $("field-isbn"), isbnError = $("isbn-error");
  const btnBuscar = $("btnBuscar"), btnLimpar = $("btnLimpar"), btnCancelar = $("btnCancelar"), btnAjuda = $("btnAjuda");
  const statusEl = $("status"), resultsEl = $("results");
  const ajudaDialog = $("ajudaDialog");
  let searchTimer = null;

  $("lista-autores").innerHTML = [...new Set(acervo.map(b=>b.autor))].map(a=>`<option value="${a}">`).join("");
  $("lista-titulos").innerHTML = acervo.map(b=>`<option value="${b.titulo}">`).join("");

  function activeFields(){
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    return { autor: tipo==="todos"||tipo==="autor", titulo: tipo==="todos"||tipo==="titulo", isbn: tipo==="todos"||tipo==="isbn" };
  }

  function syncFields(){
    const a = activeFields();
    autorInput.disabled = !a.autor;
    tituloInput.disabled = !a.titulo;
    isbnInput.disabled = !a.isbn;
    if(!a.autor) autorInput.value="";
    if(!a.titulo) tituloInput.value="";
    if(!a.isbn){ isbnInput.value=""; isbnField.classList.remove("has-error"); }
    updateBuscarState();
  }

  function updateBuscarState(){
    const filled = autorInput.value.trim() || tituloInput.value.trim() || isbnInput.value.trim();
    btnBuscar.disabled = !filled;
  }

  document.querySelectorAll('input[name="tipo"]').forEach(r => r.addEventListener("change", syncFields));
  [autorInput, tituloInput].forEach(i => i.addEventListener("input", updateBuscarState));
  isbnInput.addEventListener("input", () => {
    isbnInput.value = isbnInput.value.replace(/[^0-9]/g, "");
    isbnField.classList.remove("has-error");
    updateBuscarState();
  });

  btnLimpar.addEventListener("click", () => {
    form.reset();
    syncFields();
    resultsEl.innerHTML = "";
    statusEl.innerHTML = "";
    isbnField.classList.remove("has-error");
    autorInput.focus();
  });

  btnAjuda.addEventListener("click", () => ajudaDialog.showModal());
  $("fecharAjuda").addEventListener("click", () => ajudaDialog.close());

  btnCancelar.addEventListener("click", () => {
    clearTimeout(searchTimer);
    setLoading(false);
    statusEl.innerHTML = `<span>Busca cancelada.</span>`;
  });

  function setLoading(isLoading){
    [autorInput, tituloInput, isbnInput, btnLimpar].forEach(el => el.disabled = isLoading || el.disabled && el===isbnInput && false);
    btnBuscar.hidden = isLoading;
    btnCancelar.hidden = !isLoading;
    if(isLoading){
      syncFields(); // re-apply radio-based disabling, then force-disable all for loading
      [autorInput, tituloInput, isbnInput].forEach(el => el.disabled = true);
    } else {
      syncFields();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isbnVal = isbnInput.value.trim();
    if(isbnVal && isbnVal.length !== 10 && isbnVal.length !== 13){
      isbnField.classList.add("has-error");
      isbnInput.focus();
      statusEl.innerHTML = "";
      return;
    }
    isbnField.classList.remove("has-error");
    resultsEl.innerHTML = "";
    statusEl.innerHTML = `<div class="loading"><span class="spinner" aria-hidden="true"></span> Buscando no acervo…</div>`;
    setLoading(true);

    searchTimer = setTimeout(() => {
      const autorV = autorInput.value.trim().toLowerCase();
      const tituloV = tituloInput.value.trim().toLowerCase();
      const isbnV = isbnInput.value.trim();

      const matches = acervo.filter(b =>
        (autorV && b.autor.toLowerCase().includes(autorV)) ||
        (tituloV && b.titulo.toLowerCase().includes(tituloV)) ||
        (isbnV && b.isbn === isbnV)
      );

      setLoading(false);

      if(matches.length){
        statusEl.innerHTML = `<span>${matches.length} resultado(s) encontrado(s).</span>`;
        resultsEl.innerHTML = matches.map(b => `
          <div class="book">
            <strong>${b.titulo}</strong>
            <span>${b.autor} · ISBN ${b.isbn}</span>
          </div>`).join("");
      } else {
        statusEl.innerHTML = "";
        resultsEl.innerHTML = `<div class="empty">Nenhuma obra encontrada. Verifique a grafia ou tente buscar só pelo título.</div>`;
      }
    }, 1100);
  });

  syncFields();
})();