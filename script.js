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
    {
        question: "Quel est le symbole principal de la Saint-Valentin ?",
        answers: [
            "Le cœur",
            "Le trèfle",
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
        correct: 1,
    },
    // Questions supplémentaires
    {
        question: "Quelle ville est considérée comme la ville de l'amour ?",
        answers: [
            "Paris",
            "Venise",
            "Rome",
            "New York",
        ],
        correct: 1,
    },
    {
        question: "Quel est le film romantique le plus célèbre ?",
        answers: [
            "Titanic",
            "La La Land",
            "Dirty Dancing",
            "The Notebook",
        ],
        correct: 1,
    },
    {
        question: "Quel est le plat préféré pour un dîner de Saint-Valentin ?",
        answers: [
            "Pâtes aux truffes",
            "Pizza",
            "Sushi",
            "Burgers",
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
        correct: 3,
    },
    {
        question: "Quel est le parfum de rose le plus populaire ?",
        answers: [
            "Rose rouge",
            "Rose blanche",
            "Rose jaune",
            "Rose rose",
        ],
        correct: 1,
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
    }, 2000);
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
        <div class="final-score">
            <p>Votre score final est de : ${score}</p>
            ${score >= 20 ? "🎉 Félicitations, vous avez gagné ! 🎉" : "😢 Vous avez perdu. Réessayez !"}
        </div>
    `;
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(currentQuestionIndex);
});
