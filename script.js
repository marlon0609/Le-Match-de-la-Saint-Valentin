const startButton = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');
const questionSection = document.getElementById('questionSection');
const questionText = document.getElementById('question');
const answersDiv = document.getElementById('answers');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Quel est le cadeau le plus romantique pour la Saint-Valentin ?",
        answers: [
            "Un bouquet de roses rouges",
            "Un abonnement Netflix",
            "Une boîte de chocolats",
            "Un poème manuscrit",
        ],
        correct: 1,
    },
    {
        question: "Cupidon est célèbre pour avoir quelle arme ?",
        answers: [
            "Un arc et des flèches",
            "Un pistolet laser",
            "Une baguette magique",
            "Un lance-pierre",
        ],
        correct: 1,
    },
    {
        question: "Quelle couleur est associée à la Saint-Valentin ?",
        answers: [
            "Bleu",
            "Rouge",
            "Vert",
            "Noir",
        ],
        correct: 2,
    },
];

function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'btn';
        button.dataset.answer = i + 1;
        button.addEventListener('click', () => checkAnswer(i + 1));
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestionIndex].correct) {
        score += 10;
        alert('Bonne réponse !');
    } else {
        alert('Mauvaise réponse.');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

function endGame() {
    alert(`Jeu terminé ! Votre score final est de : ${score}`);
    gameArea.style.display = 'none';
    startButton.style.display = 'block';
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(currentQuestionIndex);
});
