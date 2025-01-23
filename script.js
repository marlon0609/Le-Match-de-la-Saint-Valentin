const startButton = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');
const questionSection = document.getElementById('questionSection');
const questionText = document.getElementById('question');
const answersDiv = document.getElementById('answers');

// Ajoute un conteneur pour les messages de réponse
const responseMessageDiv = document.createElement('div');
document.body.appendChild(responseMessageDiv); // Ajoute le message de réponse à la page

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Quel est le cadeau le plus romantique pour la Saint-Valentin ?",
        answers: [
            "Un abonnement Netflix",
            "Un bouquet de roses rouges",
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
        correct: 0,
    },
    {
        question: "Quelle couleur est associée à la Saint-Valentin ?",
        answers: [
            "Bleu",
            "Vert",
            "Rouge",
            "Noir",
        ],
        correct: 2,
    },
    {
        question: "Quel est le symbole principal de la Saint-Valentin ?",
        answers: [
            "Le boucheon",
            "Le cœur",
            "La rose",
            "Le diamant",
        ],
        correct: 1,
    },
    {
        question: "Quelle est la date exacte de la Saint-Valentin ?",
        answers: [
            "14 février",
            "1er décembre",
            "25 décembre",
            "31 octobre",
        ],
        correct: 0,
    },
    // Questions supplémentaires
    {
        question: "Quelle ville est considérée comme la ville de l'amour ?",
        answers: [
            "Venise",
            "Rome",
            "New York",
            "Paris",
        ],
        correct: 3,
    },
    {
        question: "Quel est le film romantique le plus célèbre ?",
        answers: [
            "Titanic",
            "La La Land",
            "Dirty Dancing",
            "The Notebook",
        ],
        correct: 0,
    },
    {
        question: "Quel mot en anglais signifie amour ?",
        answers: [
            "About",
            "Love",
            "Myself",
            "Friendship",
        ],
        correct: 1,
    },
    {
        question: "Quel est l'animal symbolisant l'amour et la fidélité ?",
        answers: [
            "Le chien",
            "Le cheval",
            "Le pigeon",
            "Le chat",
        ],
        correct: 2,
    },
    {
        question: "Quel est le parfum de rose le plus populaire ?",
        answers: [
            "Rose rouge",
            "Rose blanche",
            "Rose jaune",
            "Rose rose",
        ],
        correct: 0,
    }
];


function loadQuestion(index) {
    if (index >= questions.length) {
        endGame();
        return;
    }

    const question = questions[index];
    questionText.textContent = question.question;

    // Vide les réponses précédentes
    answersDiv.innerHTML = '';

    // Génère les réponses
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'btn btn-answer';
        button.dataset.index = i;
        button.addEventListener('click', () => checkAnswer(i));
        answersDiv.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (responseMessageDiv.style.opacity === "1") return; // Empêche les clics multiples

    // Affiche la question suivante
    const currentQuestion = questions[currentQuestionIndex];

    // Affiche un message selon la réponse
    if (selectedIndex === currentQuestion.correct) {
        showResponseMessage("Bonne réponse ! 🎉", "success");
        score += 10; // Ajoute des points pour une bonne réponse
    } else {
        showResponseMessage("Mauvaise réponse... 😢", "danger");
    }

    // Passe à la question suivante après un délai
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }, 1000);
}

function showResponseMessage(message, type) {
    responseMessageDiv.textContent = message;
    responseMessageDiv.className = `response-message alert alert-${type}`;
    responseMessageDiv.style.opacity = 1;

    // Cache le message après 2 secondes
    setTimeout(() => {
        responseMessageDiv.style.opacity = 0;
    }, 1500);
}

function endGame() {
    gameArea.innerHTML = `
        <div class="final-score alert alert-info text-center">
            <h2>Fin du jeu !</h2>
            <p>Votre score final est de : <strong>${score}</strong></p>
            <p>${score >= 20 ? "🎉 Félicitations, vous êtes un expert en amour ! 🎉" : "😢 Vous pouvez faire mieux. Réessayez !"}</p>
            <button class="btn btn-primary" onclick="restartGame()">Rejouer</button>
        </div>
    `;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    gameArea.style.display = 'block';
    loadQuestion(currentQuestionIndex);
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(currentQuestionIndex);
});
