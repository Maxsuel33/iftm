vet = [];

for (i = 1; i <= 60; i++)
    vet[i-1] = i;

// console.log(vet);


for (i=0; i < 6; i++) {
    indiceVetor = Math.floor(Math.random()*vet.length);
    nmrSorte = vet[indiceVetor];
    console.log(nmrSorte)
    vet.splice(indiceVetor, 1)
}









