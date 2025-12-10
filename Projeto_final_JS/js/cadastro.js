document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const userInput = document.getElementById('novoUser');
    const senhaInput = document.getElementById('novaSenha');
    const confSenhaInput = document.getElementById('confSenha');
    const feedback = document.getElementById('feedback');
    const button = document.getElementById('cadastrar');

    // Função para mostrar msg de retorno ao usuario
    function msgSenha(message, type) {
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'feedback';
        }, 5000); 
    }

    // Função para validar senha forte
    function senhaForte(password) {
        return password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }

    // Função para obter usuários do localStorage (como um "baralho" de jogadores)
    function getUsers() {
        const users = localStorage.getItem('jogoCartasUsers');
        return users ? JSON.parse(users) : {};
    }

    // Função para salvar usuários
    function saveUsers(users) {
        localStorage.setItem('jogoCartasUsers', JSON.stringify(users));
    }

    // Evento de submit do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne reload da página

        const username = userInput.value.trim();
        const password = senhaInput.value;
        const confirmPassword = confSenhaInput.value;

        // Validações
        if (!username) {
            msgSenha('O nome do usuário é obrigatório!', 'error');
            userInput.focus();
            return;
        }

        if (!password) {
            msgSenha('A senha é obrigatória!', 'error');
            senhaInput.focus();
            return;
        }

        if (!senhaForte(password)) {
            msgSenha('A senha deve ter pelo menos 6 caracteres, com letras e números!', 'error');
            senhaInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            msgSenha('As senhas não coincidem!', 'error');
            confSenhaInput.focus();
            return;
        }

        // Verifica se usuário já existe
        const users = getUsers();
        if (users[username]) {
            msgSenha('Este usuário já existe no baralho!', 'error');
            userInput.focus();
            return;
        }

        // Cadastra o usuário
        users[username] = { password: btoa(password) }; // Codifica a senha (básico, não seguro para produção)
        saveUsers(users);

        msgSenha('Jogador cadastrado com sucesso! Embaralhando...', 'success');
        button.disabled = true;
        button.textContent = 'Embaralhando...';


        // Limpa campos e redireciona após delay
        setTimeout(() => {
            userInput.value = '';
            senhaInput.value = '';
            confSenhaInput.value = '';
            button.disabled = false;
            button.textContent = 'Cadastrar Jogador';
            window.location.href = 'index.html'; // Redireciona para login
        }, 2000);
    });
});