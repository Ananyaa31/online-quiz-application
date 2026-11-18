const questions = [
  {
    question: "Which language creates the structure of a web page?",
    choices: ["HTML", "CSS", "JavaScript", "Python"],
    correctAnswer: 0
  },
  {
    question: "Which language is used to style a web page?",
    choices: ["HTML", "CSS", "SQL", "C++"],
    correctAnswer: 1
  },
  {
    question: "Which language can add interactivity to a web page?",
    choices: ["JavaScript", "CSS", "HTML", "XML"],
    correctAnswer: 0
  },
  {
    question: "Which HTML tag creates a link?",
    choices: ["<p>", "<a>", "<h1>", "<img>"],
    correctAnswer: 1
  },
  {
    question: "Which HTML tag displays an image?",
    choices: ["<image>", "<picture-file>", "<img>", "<src>"],
    correctAnswer: 2
  }
];

let currentQuestionIndex = 0;
const selectedAnswers = Array(questions.length).fill(null);

const questionNumberElement = document.querySelector("#question-number");
const questionElement = document.querySelector("#question");
const choicesElement = document.querySelector("#choices");
const feedbackElement = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");

function calculateScore() {
  return questions.reduce((total, question, index) => {
    return total + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionElement.textContent = currentQuestion.question;
  choicesElement.replaceChildren();
  feedbackElement.textContent = "";

  currentQuestion.choices.forEach((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;

    if (selectedAnswer === choiceIndex) {
      button.classList.add("selected");
      if (choiceIndex === currentQuestion.correctAnswer) {
        button.classList.add("correct");
        feedbackElement.textContent = "Correct answer!";
        feedbackElement.style.color = "#027a48";
      } else {
        button.classList.add("incorrect");
        feedbackElement.textContent = "That answer is incorrect.";
        feedbackElement.style.color = "#b42318";
      }
    }

    button.addEventListener("click", () => {
      selectedAnswers[currentQuestionIndex] = choiceIndex;
      showQuestion();
    });

    choicesElement.appendChild(button);
  });

  scoreElement.textContent = `Your score: ${calculateScore()} / ${questions.length}`;
  previousButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = false;
  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
    return;
  }

  const finalScore = calculateScore();
  questionElement.textContent = "Quiz finished!";
  questionNumberElement.textContent = "Here are your results:";
  choicesElement.replaceChildren();
  feedbackElement.textContent = `You scored ${finalScore} out of ${questions.length}.`;
  feedbackElement.style.color = "#4338ca";
  scoreElement.textContent = "Press Restart Quiz to try again.";
  previousButton.disabled = true;
  nextButton.disabled = true;
});

previousButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  selectedAnswers.fill(null);
  showQuestion();
});

showQuestion();
