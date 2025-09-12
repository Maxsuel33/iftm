qtdGrupos = parseInt(prompt("Digite a quantidade de grupos:"));

nome = [];

for (i = 0; i < qtdGrupos; i++) {
    nome[i] = prompt("Digite o nome do grupo " + (i+1) + ":");
}

for(i = 0; i < qtdGrupos; i++){
    grupoAleatorio = Math.floor(Math.random()*nome.length)

    document.write(`<center>${i + 1}° ${nome[grupoAleatorio]}<br></center>`)
    nome.splice(grupoAleatorio, 1)
}