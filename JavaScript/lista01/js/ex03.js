nomeCompleto = prompt("Digite seu nome completo: ");
idade = prompt("Digite sua idade: ");

if (idade >= 18) 
    alert(`${nomeCompleto}, você já POSSUI idade para tirar carteira`);
else 
    alert(`${nomeCompleto}, você ainda NÃO POSSUI idade para tirar carteira, ainda falta(m) ${18 - idade} anos.`)
