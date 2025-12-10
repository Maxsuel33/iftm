Repositório destinado ao armazenamento do PROJETO FINAL DA DISCIPLINA JS BÁSICO

Para acesso de site login: https://maxsuel33.github.io/iftm/Projeto_final_JS/index.html

Para acesso de site cadastro: https://maxsuel33.github.io/iftm/Projeto_final_JS/cadastro.html









# 🎴 TruQuinho

> Um jogo de Truco Mineiro single-player desenvolvido em Vanilla JavaScript, focado em lógica de regras tradicionais e inteligência artificial desafiadora.

![Status do Projeto](https://img.shields.io/badge/Status-Funcional-brightgreen)
![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-yellow)

## 📖 Sobre o Projeto

Este projeto é uma implementação web do clássico jogo de cartas **Truco Mineiro**. Diferente do Truco Paulista, esta versão utiliza o baralho limpo (27 cartas) e possui **Manilhas Fixas**.

O jogo foi construído focando na manipulação do DOM e gerenciamento de estado sem o uso de frameworks externos, garantindo leveza e performance. O oponente (CPU) possui uma lógica de decisão capaz de avaliar sua própria mão, blefar e responder a pedidos de Truco.

## ✨ Funcionalidades

- **Regras de Truco Mineiro:** Baralho de 27 cartas (sem 8, 9, 10 e com limitação de cartas baixas).
- **Manilhas Fixas:** A ordem de força segue a tradição mineira (4 de Paus, 7 de Copas, Ás de Espadas, 7 de Ouros).
- **Sistema de Apostas Progressivo:**
  - Pedir Truco (3 tentos)
  - Pedir Seis (6 tentos)
  - Pedir Nove (9 tentos)
  - Pedir Doze (12 tentos)
- **Inteligência Artificial (CPU):**
  - Avalia a força da mão (pde 0 a 100).
  - Decide se corre, aceita ou aumenta a aposta com base na probabilidade e fator de aleatoriedade (blefe).
  - Joga cartas estrategicamente (tenta economizar cartas fortes ou "esconder" o jogo).
- **Timer de Rodada:** Tempo limite para jogada, ajustável por dificuldade.
- **Dificuldade Ajustável:** Fácil (30s), Médio (15s) e Difícil (8s).

## 🎮 Regras Implementadas (Hierarquia)

A força das cartas segue a ordem decrescente (do mais forte para o mais fraco):

1.  **Manilhas (Fixas):**
    - ♣️ **Zap** (4 de Paus)
    - ♥️ **7 de Copas**
    - ♠️ **Espadilha** (Ás de Espadas)
    - ♦️ **7 de Ouros**
2.  **Cartas Comuns:**
    - 3 (Todos os naipes)
    - 2 (Todos os naipes)
    - Ás (exceto Espadas)
    - K (Reis)
    - Q (Dama)
    - J (Valete)

## 🚀 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e modal de mensagens.
- **CSS3:** Estilização das cartas, mesa e animações.
- **JavaScript (ES6+):**
  - Lógica de Estado (`state object`).
  - Manipulação de DOM.
  - `setInterval` para controle de tempo.
  - `sessionStorage` para persistência do nome do jogador.

