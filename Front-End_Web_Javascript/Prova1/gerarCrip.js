import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

async function gerar() {
  const resposta = await fetch('usuarios.json');
  const dados = await resposta.json();

  const novos = dados.map(user => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    return {
      username: user.username,
      password: hash
    };
  });

  console.log(JSON.stringify(novos, null, 2));
}

gerar();