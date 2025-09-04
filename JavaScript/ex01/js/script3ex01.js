jogador1 = ["pedra", "papel" , "tesoura"];
jogador2 = ["pedra", "papel" , "tesoura"];

indiceVetor1 = Math.floor(Math.random()*3);
indiceVetor2 = Math.floor(Math.random()*3);



escolhajgr1 = jogador1.splice(indiceVetor1, 1);
console.log(`Jogador 1: ${escolhajgr1}`);

escolhajgr2 = jogador2.splice(indiceVetor2, 1);
console.log(`Jogador 2: ${escolhajgr2}`);



if (indiceVetor1 === indiceVetor2) {
    console.log("Empate!");
} else if (
    (indiceVetor1 === 0 && indiceVetor2 === 2) ||
    (indiceVetor1 === 1 && indiceVetor2 === 0) ||
    (indiceVetor2 === 2 && indiceVetor2 === 1)
) {
    console.log("Jogador 1 venceu!");
} else {
    console.log("Jogador 2 venceu!");
}


















