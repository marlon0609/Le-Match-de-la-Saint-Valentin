document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("startScreen");
    const gameArea = document.getElementById("gameArea");
    const endScreen = document.getElementById("endScreen");
    const userNameInput = document.getElementById("userName");
    const questionText = document.getElementById("question");
    const answersDiv = document.getElementById("answers");
    const scoreCircle = document.getElementById("scoreCircle");
    const correctCount = document.getElementById("correctCount");
    const incorrectCount = document.getElementById("incorrectCount");
    const totalQuestions = document.getElementById("totalQuestions");
    const displayName = document.getElementById("displayName");

    let userName = "";
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let questions = [
        {
            question: "Quel est le cadeau le plus romantique pour la Saint-Valentin ?",
            answers: ["Un abonnement Netflix", "Un bouquet de roses rouges", "Une boîte de chocolats", "Un poème manuscrit"],
            correct: 1,
        },
        {
            question: "Cupidon est célèbre pour avoir quelle arme ?",
            answers: ["Un arc et des flèches", "Un pistolet laser", "Une baguette magique", "Un lance-pierre"],
            correct: 0,
        },
        {
            question: "Quelle couleur est associée à la Saint-Valentin ?",
            answers: ["Bleu", "Vert", "Rouge", "Noir"],
            correct: 2,
        }
    ];

    document.getElementById("startGame").addEventListener("click", () => {
        userName = userNameInput.value.trim();
        if (!userName) {
            alert("Veuillez entrer votre prénom avant de commencer.");
            return;
        }
        startScreen.style.display = "none";
        gameArea.style.display = "block";
        loadQuestion();
    });

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        answersDiv.innerHTML = "";
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.className = "btn btn-outline-primary d-block mb-2";
            button.addEventListener("click", () => checkAnswer(index));
            answersDiv.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        if (selectedIndex === question.correct) {
            correctAnswers++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    function endGame() {
        gameArea.style.display = "none";
        endScreen.style.display = "block";
        displayName.textContent = userName;
        const total = questions.length;
        const percentage = Math.round((correctAnswers / total) * 100);

        scoreCircle.textContent = `${percentage}%`;
        scoreCircle.className = `circle ${percentage >= 50 ? "green" : "red"}`;
        correctCount.textContent = correctAnswers;
        incorrectCount.textContent = total - correctAnswers;
        totalQuestions.textContent = total;
    }

    document.getElementById("restartGame").addEventListener("click", () => {
        location.reload();
    });
});
