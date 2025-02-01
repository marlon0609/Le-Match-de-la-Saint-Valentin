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
            answers: ["Le chien", "Le cheval", "Le pigeon", "Le chat"],
            correct: 2,
        },
        {
            question: "Quel est le parfum de rose le plus populaire ?",
            answers: ["Rose rouge", "Rose blanche", "Rose jaune", "Rose rose"],
            correct: 0,
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
            showResponseMessage("Bonne réponse ! 🎉", "success");
        } else {
            showResponseMessage("Mauvaise réponse... 😢", "danger");
        }
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
