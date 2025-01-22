const startButton = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');
const questionSection = document.getElementById('questionSection');
const questionText = document.getElementById('question');
const answersDiv = document.getElementById('answers');
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


function checkAnswer(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    let responseMessage = '';
    if (selected === currentQuestion.correct) {
        score += 10;
        responseMessage = 'Bonne réponse !';
        responseMessageDiv.style.backgroundColor = '#28a745';
    } else {
        responseMessage = 'Mauvaise réponse.';
        responseMessageDiv.style.backgroundColor = '#dc3545';
    }

    responseMessageDiv.textContent = responseMessage;
    responseMessageDiv.className = 'response-message';

    setTimeout(() => {
        responseMessageDiv.style.opacity = 0;
    }, 2500);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

function endGame() {
    const finalMessage = document.createElement('div');
    finalMessage.className = 'final-score';
    finalMessage.textContent = `Votre score final est de : ${score}`;

    if (score >= 40) {
        finalMessage.classList.add('win');
        finalMessage.textContent += " 🎉 Félicitations, vous avez gagné ! 🎉";
    } else {
        finalMessage.classList.add('lose');
        finalMessage.textContent += " 😢 Désolé, vous avez perdu... 😢";
    }

    gameArea.appendChild(finalMessage);
}

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(currentQuestionIndex);
});
