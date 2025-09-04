vet = [];

for (i = 0; i < 20; i++)
    vet[i] = 10*(i+1);



indice = prompt("Você deseja retirar qual elemento do índice ?")


console.log(vet);

console.log(indice);

elementoRemovido = vet.splice(indice,1);


console.log(vet);
console.log(elementoRemovido[0]);



