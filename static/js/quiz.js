let indice = 0;
let pontuacao = 0;
let perguntas = [];

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const progressoEl = document.getElementById("progresso");
const resultadoEl = document.getElementById("resultado");

async function carregarQuiz() {
    const resposta = await fetch("/api/perguntas");

    perguntas = await resposta.json();

    mostrarPergunta();
}

function mostrarPergunta() {

    const atual = perguntas[indice];

    perguntaEl.textContent = atual.pergunta;

    progressoEl.textContent =
        `Questão ${indice + 1} de ${perguntas.length}`;

    alternativasEl.innerHTML = "";

    atual.alternativas.forEach(function (alternativa) {

        const botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.onclick = function () {

            if (alternativa === atual.resposta) {
                pontuacao++;
            }

            indice++;

            if (indice < perguntas.length) {
                mostrarPergunta();
            } else {
                finalizarQuiz();
            }
        };

        alternativasEl.appendChild(botao);
        alternativasEl.appendChild(document.createElement("br"));
    });
}

function finalizarQuiz() {
    perguntaEl.textContent = "";
    alternativasEl.innerHTML = "";
    progressoEl.textContent = "";

    resultadoEl.innerHTML = `
        <h2>Você acertou ${pontuacao} de ${perguntas.length} questões!</h2>

        <button id="novoQuiz">Gerar outro Quiz</button>

        <br><br>

        <button id="inicio">Página Principal</button>
    `;

    const novoQuiz = document.getElementById("novoQuiz");
    const inicio = document.getElementById("inicio");

    novoQuiz.onclick = function () {
        location.reload();
    };

    inicio.onclick = function () {
        window.location.href = "/";
    };
}

carregarQuiz();