document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const userInput = document.getElementById('loginUser');
    const senhaInput = document.getElementById('loginSenha');
    const feedback = document.getElementById('feedback');
    const button = document.getElementById('entrar');

    // Função auxiliar para mensagens (Reutilizada da lógica de feedback)
    function msgSenha(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        // Se for erro, limpa após 3 segundos
        if (type === 'error') {
            setTimeout(() => {
                feedback.textContent = '';
                feedback.className = 'feedback';
            }, 3000);
        }
    }

    // Função para buscar usuários salvos
    function getUsers() {
        const users = localStorage.getItem('jogoCartasUsers');
        return users ? JSON.parse(users) : {};
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = userInput.value.trim();
        const password = senhaInput.value;

        // Validação básica de campos vazios
        if (!username || !password) {
            msgSenha('Por favor, preencha todos os campos.', 'error');
            return;
        }

        const users = getUsers();

        // Verifica se o usuário existe
        if (!users.hasOwnProperty(username)) {
            msgSenha('Usuário não encontrado. Verifique o nome ou cadastre-se.', 'error');
            userInput.focus();
            return;
        }

        // Verifica a senha
        const storedPassword = users[username].password;
        const inputPasswordEncoded = btoa(password);

        if (storedPassword !== inputPasswordEncoded) {
            msgSenha('Senha incorreta! Tente novamente.', 'error');
            senhaInput.value = ''; // Limpa campo de senha
            senhaInput.focus();
            return;
        }

        // Login com sucesso
        msgSenha(`Login autorizado! Entrando no jogo...Bem vindo, ${username}!`, 'success');
        button.disabled = true;
        button.textContent = 'Carregando...';

        // Salva a sessão atual (quem está logado)
        sessionStorage.setItem('usuarioLogado', username);


        setTimeout(() => {

            //redirecionar para o a pagina do jog
            alert(`Redirecionando para o jogo...`);
            window.location.href = 'jogo.html'; 
            button.disabled = false;
            button.textContent = 'Entrar na Mesa';
            feedback.textContent = '';
        }, 3000);
    });
});