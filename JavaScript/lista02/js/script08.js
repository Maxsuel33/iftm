jogador1 = ["pedra", "papel" , "tesoura"];
jogador2 = ["pedra", "papel" , "tesoura"];

indiceVetor1 = Math.floor(Math.random()*3);
indiceVetor2 = Math.floor(Math.random()*3);


if (indiceVetor1 === indiceVetor2) {
    document.writeln("<p>EMPATE</p>")
} else if (
    (indiceVetor1 === 0 && indiceVetor2 === 2) ||
    (indiceVetor1 === 1 && indiceVetor2 === 0) ||
    (indiceVetor2 === 2 && indiceVetor2 === 1)
) {
    document.writeln("<p>JOGADOR 1 GANHOU!!!!</p>");
} else {
    document.writeln("<p>JOGADOR 2 GANHOU!!!!</p>");
}


document.write("Jogador 1:ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤJogador 2:<br>")
switch(indiceVetor1){
    case 0:
        document.write('<img src="img/Jokenpo/0.webp" alt="" style="width: 250px;">')
        break;
    case 1:
        document.write('<img src="img/Jokenpo/1.jpg" alt="" style="width: 250px;">')
        break;
    case 2:
        document.write('<img src="img/Jokenpo/2.jpg" alt="" style="width: 250px;">')
        break;
}

switch(indiceVetor2){
    case 0:
        document.write('<img src="img/Jokenpo/0.webp" alt="" style="width: 250px;">')
        break;
    case 1:
        document.write('<img src="img/Jokenpo/1.jpg" alt="" style="width: 250px;">')
        break;
    case 2:
        document.write('<img src="img/Jokenpo/2.jpg" alt="" style="width: 250px;">')
        break;
}