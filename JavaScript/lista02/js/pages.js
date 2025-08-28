nome = prompt("Digite o seu nome completo:", "Maxsuel Silva Teles");

opcao = prompt("[MENU]"+ 
    "\n[1] Letras Maiúsculas"+
    "\n[2] Letras Minúsculas"+
    "\n[3] Primeira letra do primeiro nome maiúscula "+
    "\n[4] Primeiro nome "+
    "\n[5] Primeiro nome maiúsculo e último nome minúsculo"+
    "\n[6] Substitua o primeiro nome por um novo nome "+
    "\n[7] Primeira letra do primeiro nome e do ultimo nome maiusculas concatenadas"+
    "\n[8] Exiba as 3 primeiras letras do nome ");


    switch(opcao) {
        case "1":
            document.write(`<p>${nome.toUpperCase()}</p>`)
        break;

        case "2": document.write(`<p>${nome.toLowerCase()}</p>`)
           
        break;

        case "3":
        document.write((`<p>${nome.charAt(0)}</p>`))

        break;

        case "4":
            document.write((`<p>${nome.split(' ')[0]}</p>`))

        break;

        case "5":
            document.write(`<p>${nome.split(' ')[0].topUpperCase()} ${nome.split(' ')[nome.split(' ').length - 1].toLowerCase()}</p>`)

        break;

        case "6":
            document.write()

        break;

        case "7":
            document.write()

        break;

        case "8":
            document.write()

        break;
        
    }