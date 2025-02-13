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

    // Création de l'élément audio
    const backgroundMusic = new Audio('https://www.dropbox.com/scl/fi/udyoam35007amefjx23eu/LIMO-Joggo-Clip-Officiel.mp3?rlkey=5bfc968smquog4xhpai3a240a&st=ftiis1c8&dl=0');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Volume à 30%

    // Ajout du bouton de contrôle du son
    const soundButton = document.createElement('button');
    soundButton.innerHTML = '🔊';
    soundButton.className = 'btn btn-outline-primary sound-button';
    soundButton.style.position = 'fixed';
    soundButton.style.top = '20px';
    soundButton.style.right = '20px';
    soundButton.style.zIndex = '1000';
    document.body.appendChild(soundButton);

    let isMusicPlaying = false;

    // Gestion du son
    function toggleSound() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            soundButton.innerHTML = '🔇';
        } else {
            backgroundMusic.play().catch(error => {
                console.log("Lecture automatique bloquée:", error);
            });
            soundButton.innerHTML = '🔊';
        }
        isMusicPlaying = !isMusicPlaying;
    }

    soundButton.addEventListener('click', toggleSound);

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
    let timer;
    let timerInterval;
    const QUESTION_TIME = 20;

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
        return name.trim().length >= 2;
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
        currentQuestionIndex = 0;
        correctAnswers = 0;
        answersHistory = [];
        
        // Démarrer la musique au début du jeu
        if (!isMusicPlaying) {
            toggleSound();
        }
        
        loadQuestion();
    });

    function startTimer() {
        clearInterval(timerInterval);
        timer = QUESTION_TIME;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timer--;
            updateTimerDisplay();
            
            if (timer <= 0) {
                clearInterval(timerInterval);
                handleTimeUp();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const timerElement = document.getElementById("timer");
        const timerBar = document.getElementById("timerBar");
        const progress = (timer / QUESTION_TIME) * 100;
        
        timerElement.textContent = timer;
        timerBar.style.background = `conic-gradient(#ff66cc ${progress}%, transparent ${progress}%)`;
        
        if (timer <= 5) {
            timerElement.classList.add("timer-warning");
        } else {
            timerElement.classList.remove("timer-warning");
        }
    }

    function handleTimeUp() {
        showResponseMessage("Temps écoulé ! ⏰", "warning");
        const question = questions[currentQuestionIndex];
        
        answersHistory.push({
            question: question.question,
            selectedAnswer: "Temps écoulé",
            correctAnswer: question.answers[question.correct],
            isCorrect: false
        });

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    }

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

        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById("progressBar").style.width = `${progress}%`;

        startTimer();
    }

    function createConfetti() {
        const container = document.getElementById("confettiContainer");
        const colors = ["#ff66cc", "#ff99cc", "#ff3399", "#ff0066", "#ffccff"];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + "s";
            container.appendChild(confetti);
        }
    }

    function animateScore(score) {
        const scoreCircle = document.getElementById("scoreCircle");
        let currentScore = 0;
        const duration = 2000;
        const interval = 20;
        const steps = duration / interval;
        const increment = score / steps;

        scoreCircle.textContent = "0%";
        scoreCircle.classList.add("animate");

        const animation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= score) {
                currentScore = score;
                clearInterval(animation);
                if (score >= 50) {
                    createConfetti();
                }
            }
            scoreCircle.textContent = `${Math.round(currentScore)}%`;
        }, interval);
    }

    function endGame() {
        clearInterval(timerInterval);
        gameArea.style.display = "none";
        endScreen.style.display = "block";
        
        const total = questions.length;
        const percentage = Math.round((correctAnswers / total) * 100);
    
        finalMessage.innerHTML = percentage >= 50 
            ? `Félicitations ${userName}, vous êtes un expert en amour ! 💖`
            : `Dommage ${userName}, mais vous pouvez faire mieux ! 💔`;
    
        scoreCircle.className = `circle ${percentage >= 50 ? "green" : "red"}`;
        correctCount.textContent = correctAnswers;
        incorrectCount.textContent = total - correctAnswers;
        totalQuestions.textContent = total;
    
        // Obtenir la date actuelle
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
    
        submitToGoogleForms(userName, correctAnswers, total, percentage, answersHistory, year, month, day);
    
        setTimeout(() => {
            animateScore(percentage);
        }, 500);
    
        displayAnswerHistory();
    }
    
    function submitToGoogleForms(userName, correctAnswers, total, percentage, history, year, month, day) {
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfXfO7hVr0lyTHya7JCoEBI0AV7UnuhjjFFUsvnmhao_cqBIA/formResponse';
        
        const answersResume = history.map(answer => 
            `Q: ${answer.question}\nR: ${answer.selectedAnswer}\nCorrect: ${answer.isCorrect}`
        ).join('\n\n');
    
        const formData = new FormData();
        formData.append('entry.821432320', userName);
        formData.append('entry.647951827', correctAnswers.toString());
        formData.append('entry.205635801', percentage.toString());
        formData.append('entry.1244758233', answersResume);
        
        formData.append('entry.1947922380_year', year.toString());
        formData.append('entry.1947922380_month', month.toString());
        formData.append('entry.1947922380_day', day.toString());
    
        fetch(googleFormUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).catch(error => {
            console.error('Erreur lors de l\'envoi des données:', error);
        });
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

    function showResponseMessage(message, type) {
        responseMessageDiv.textContent = message;
        responseMessageDiv.className = `response-message alert alert-${type}`;
        responseMessageDiv.style.opacity = 1;

        setTimeout(() => {
            responseMessageDiv.style.opacity = 0;
        }, 1000);
    }

    function checkAnswer(selectedIndex) {
        clearInterval(timerInterval);
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
        const total = questions.length;
        const percentage = Math.round((correctAnswers / total) * 100);
        const text = `J'ai obtenu ${percentage}% au Quiz de la Saint-Valentin ! Peux-tu faire mieux ? 💘`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz de la Saint-Valentin',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
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
        userNameInput.classList.remove("is-invalid");
        const confettiContainer = document.getElementById("confettiContainer");
        if (confettiContainer) {
            confettiContainer.innerHTML = "";
        }
    });
});