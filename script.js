// Define quiz questions for each subject
const quizzes = {
    math: [
        {
            question: "What is the value of π (Pi)?",
            options: ["3.14", "3.1415", "22/7", "All of the above"],
            answer: 3
        },
        {
            question: "What is the derivative of x²?",
            options: ["2x", "x²", "2x²", "x"],
            answer: 0
        }
    ],
    physics: [
        {
            question: "What is the speed of light?",
            options: ["3.00 x 10^8 m/s", "2.99 x 10^8 m/s", "3.00 x 10^6 m/s", "None of the above"],
            answer: 0
        },
        {
            question: "What is the unit of force?",
            options: ["Joule", "Newton", "Pascal", "Watt"],
            answer: 1
        }
    ],
    chemistry: [
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2H", "HO2", "H2"],
            answer: 0
        },
        {
            question: "What is the pH level of pure water?",
            options: ["7", "0", "14", "10"],
            answer: 0
        }
    ],
    biology: [
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
            answer: 1
        },
        {
            question: "Which organ is responsible for pumping blood?",
            options: ["Brain", "Liver", "Heart", "Kidney"],
            answer: 2
        }
    ]
};

// Function to load questions for the selected subject
function loadQuestions(subject) {
    const questions = quizzes[subject];
    const container = document.getElementById('questionsContainer');
    container.innerHTML = ''; // Clear any existing content

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${question.question}</p>
            ${question.options.map((option, i) => `
                <input type="radio" name="q${index}" value="${i}"> ${option}<br>
            `).join('')}
        `;
        container.appendChild(questionElement);
    });
}

// Function to calculate the score and store feedback in localStorage
function submitQuiz(subject) {
    const questions = quizzes[subject];
    let score = 0;
    const feedback = []; // Array to store feedback for each question

    questions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const selectedAnswer = selected ? parseInt(selected.value) : null;
        const isCorrect = selectedAnswer === question.answer;

        if (isCorrect) score++;

        // Add feedback for each question
        feedback.push({
            question: question.question,
            selectedAnswer: selected ? question.options[selectedAnswer] : "No answer selected",
            correctAnswer: question.options[question.answer],
            isCorrect
        });
    });

    // Store feedback in localStorage
    localStorage.setItem('quizFeedback', JSON.stringify({ score, total: questions.length, feedback }));

    // Redirect to the result page
    window.location.href = `result.html`;
}
