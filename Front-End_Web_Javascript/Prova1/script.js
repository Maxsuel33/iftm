import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm'; 

const login = document.getElementById("login");

    login.addEventListener("click", async () => {
        const username = document.getElementById("user").value;
        const senha = document.getElementById("senha").value;

        const retorno = await fetch('usuariosCript.json');
        const usuarios = await retorno.json();

        const user = usuarios.find(u => u.username === username);

        if (!user) {
            alert("Usuário não encontrado !!!")
            return;
        }

        const senhaJSON = user.password;

  const resultado = bcrypt.compareSync(senha, senhaJSON);

  if (resultado) {
    alert("Senhas iguais - Login realizado com sucesso!");
  } else {
    alert("Senhas diferentes - Acesso negado");
  }

    })