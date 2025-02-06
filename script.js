document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("startScreen");
    const gameArea = document.getElementById("gameArea");
    const endScreen = document.getElementById("endScreen");
    const userNameInput = document.getElementById("userName");
    const questionText = document.getElementById("question");
    const answersDiv = document.getElementById("answers");
    const responseMessageDiv = document.createElement("div");
    document.body.appendChild(responseMessageDiv);
    responseMessageDiv.classList.add("response-message");

    const scoreCircle = document.getElementById("scoreCircle");
    const correctCount = document.getElementById("correctCount");
    const incorrectCount = document.getElementById("incorrectCount");
    const totalQuestions = document.getElementById("totalQuestions");
    const goodAnswersList = document.getElementById("goodAnswers");
    const showAnswersButton = document.getElementById("showAnswers");
    const finalMessage = document.getElementById("finalMessage");
    const shareScoreButton = document.getElementById("shareScore");

    let userName = "";
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let answersHistory = [];

    const questions = [
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
        },
        {
            question: "Quel est le symbole principal de la Saint-Valentin ?",
            answers: ["Le cœur", "Le trèfle", "La rose", "Le diamant"],
            correct: 0,
        },
        {
            question: "Quelle est la date exacte de la Saint-Valentin ?",
            answers: ["14 février", "1er décembre", "25 décembre", "31 octobre"],
            correct: 0,
        },
        {
            question: "Quelle ville est considérée comme la ville de l'amour ?",
            answers: ["Venise", "Rome", "New York", "Paris"],
            correct: 3,
        },
        {
            question: "Quel est le film romantique le plus célèbre ?",
            answers: ["Titanic", "La La Land", "Dirty Dancing", "The Notebook"],
            correct: 0,
        },
        {
            question: "Quel mot en anglais signifie amour ?",
            answers: ["About", "Love", "Myself", "Friendship"],
            correct: 1,
        },
        {
            question: "Quel est l'animal symbolisant l'amour et la fidélité ?",
            answers: ["Le chien", "Le cheval", "La Colombe", "Le chat"],
            correct: 2,
        },
        {
            question: "Quel est le parfum de rose le plus populaire ?",
            answers: ["Rose rouge", "Rose blanche", "Rose jaune", "Rose rose"],
            correct: 0,
        }
    ];

    function validateUserName(name) {
        return name.length >= 2;
    }

    document.getElementById("startGame").addEventListener("click", () => {
        userName = userNameInput.value.trim();
        if (!validateUserName(userName)) {
            userNameInput.classList.add("is-invalid");
            return;
        }
        userNameInput.classList.remove("is-invalid");
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
            button.className = "btn btn-outline-primary d-block w-100 mb-2 answer";
            button.addEventListener("click", () => checkAnswer(index));
            answersDiv.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        answersHistory.push({
            question: question.question,
            selectedAnswer: question.answers[selectedIndex],
            correctAnswer: question.answers[question.correct],
            isCorrect: isCorrect
        });

        if (isCorrect) {
            correctAnswers++;
            showResponseMessage("Bonne réponse ! 🎉", "success");
        } else {
            showResponseMessage("Mauvaise réponse... 😢", "danger");
        }

        // Désactiver tous les boutons après la réponse
        const buttons = answersDiv.querySelectorAll("button");
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === question.answers[question.correct]) {
                button.classList.add("btn-success");
            } else if (button.textContent === question.answers[selectedIndex] && !isCorrect) {
                button.classList.add("btn-danger");
            }
        });

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    }

    function showResponseMessage(message, type) {
        responseMessageDiv.textContent = message;
        responseMessageDiv.className = `response-message alert alert-${type}`;
        responseMessageDiv.style.opacity = 1;

        setTimeout(() => {
            responseMessageDiv.style.opacity = 0;
        }, 1000);
    }

    function endGame() {
        gameArea.style.display = "none";
        endScreen.style.display = "block";
        const total = questions.length;
        const percentage = Math.round((correctAnswers / total) * 100);

        finalMessage.innerHTML = percentage >= 50 
            ? `Félicitations ${userName}, vous êtes un expert en amour ! 💖`
            : `Dommage ${userName}, mais vous pouvez faire mieux ! 💔`;

        scoreCircle.textContent = `${percentage}%`;
        scoreCircle.className = `circle ${percentage >= 50 ? "green" : "red"}`;
        correctCount.textContent = correctAnswers;
        incorrectCount.textContent = total - correctAnswers;
        totalQuestions.textContent = total;

        displayAnswerHistory();
    }

    function displayAnswerHistory() {
        goodAnswersList.innerHTML = "";
        answersHistory.forEach((answer, index) => {
            const listItem = document.createElement("li");
            listItem.className = "answer-history-item mb-3 p-3 rounded";
            listItem.innerHTML = `
                <div class="question-text fw-bold">${index + 1}. ${answer.question}</div>
                <div class="answer-text ${answer.isCorrect ? 'text-success' : 'text-danger'}">
                    Votre réponse: ${answer.selectedAnswer}
                    ${!answer.isCorrect ? `<br>Bonne réponse: ${answer.correctAnswer}` : ''}
                </div>
            `;
            goodAnswersList.appendChild(listItem);
        });
    }

    showAnswersButton.addEventListener("click", () => {
        const answersList = document.getElementById("answersList");
        if (answersList.style.display === "none") {
            answersList.style.display = "block";
            showAnswersButton.textContent = "🔽 Masquer les réponses";
        } else {
            answersList.style.display = "none";
            showAnswersButton.textContent = "📜 Voir les réponses";
        }
    });

    shareScoreButton.addEventListener("click", () => {
        const score = Math.round((correctAnswers / questions.length) * 100);
        const text = `J'ai obtenu ${score}% au Quiz de la Saint-Valentin ! Peux-tu faire mieux ? 💘`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz de la Saint-Valentin',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback : copier dans le presse-papier
            navigator.clipboard.writeText(text)
                .then(() => alert('Score copié dans le presse-papier !'))
                .catch(console.error);
        }
    });

    document.getElementById("restartGame").addEventListener("click", () => {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        answersHistory = [];
        endScreen.style.display = "none";
        startScreen.style.display = "block";
        userNameInput.value = "";
    });
});