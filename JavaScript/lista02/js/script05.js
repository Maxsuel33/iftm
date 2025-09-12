alunos = parseInt(prompt("Digite a quantidade de alunos:"));

vetIdade = [];
vetNome = [];
totalIdades = 0;

for ( i = 0; i < alunos; i++) {
    vetIdade[i] = parseInt(prompt(`Digite a idade do aluno ${i + 1}:`));
    vetNome[i] = prompt(`Digite o nome do aluno ${(i+1)}:`);
    totalIdades += vetIdade[i]
}

media = totalIdades/alunos;
document.write(`A media de idades é ${media}`);

nomeAleatorio = Math.floor(Math.random()*alunos);
document.write(`O aluno sorteado foi ${nome[nomeAleatorio]}`);
