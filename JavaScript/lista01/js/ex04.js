primeiroBim = parseFloat(prompt("Digite a nota do 1º Bimestre: "));
segundoBim = parseFloat(prompt("Digite a nota do 2º Bimestre: "));

somaBim = primeiroBim + segundoBim;

if (somaBim >= 60)
    alert(`Você foi APROVADO, sua nota foi50 ${somaBim}.`);
else
    alert(`Você foi REPROVADO, esta foi a sua nota ${somaBim}, faltaram ${60 - somaBim} para ser APROVADO.`)