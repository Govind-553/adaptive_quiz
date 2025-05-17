const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const reviewScreen = document.getElementById("review-screen");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const questionNumber = document.getElementById("question-number");
const difficultyBadge = document.getElementById("difficulty-badge");
const progressFill = document.getElementById("progress-fill");
const timerDisplay = document.getElementById("timer");
const reviewList = document.getElementById("review-list");

let currentQuestionIndex = 0;
let score = 0;
let difficulty = "easy";
let questions = [];
let timer;
let timeLeft = 20;
let userAnswers = [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
let playerName = "";
const totalQuestions = 5;
const proxyUrl = "https://api.allorigins.win/raw?url=";
const apiUrl = "https://opentdb.com/api.php?amount=20&type=multiple";

function displayLeaderboard() {
  const leaderboardList = document.createElement("ul");
  leaderboardList.id = "leaderboard-list";
  leaderboard.sort((a, b) => b.score - a.score).slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name}: ${entry.score}/${totalQuestions}`;
    leaderboardList.appendChild(li);
  });
  const existingLeaderboard = document.getElementById("leaderboard-list");
  if (existingLeaderboard) existingLeaderboard.replaceWith(leaderboardList);
  else startScreen.appendChild(leaderboardList);
}

async function getSessionToken() {
  const response = await fetch(proxyUrl + encodeURIComponent("https://opentdb.com/api_token.php?command=request"));
  const data = await response.json();
  return data.token;
}

async function resetSessionToken(token) {
  await fetch(proxyUrl + encodeURIComponent(`https://opentdb.com/api_token.php?command=reset&token=${token}`));
}

async function fetchQuestions(token) {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(`${apiUrl}&token=${token}`));
    const data = await response.json();
    if (data.response_code === 4) {
      await resetSessionToken(token);
      return fetchQuestions(token);
    }
    questions = data.results.map(q => ({
      q: q.question.replace(/"/g, '"').replace(/'/g, "'"),
      options: [...q.incorrect_answers, q.correct_answer]
        .map(a => a.replace(/"/g, '"').replace(/'/g, "'"))
        .sort(() => Math.random() - 0.5),
      answer: q.correct_answer.replace(/"/g, '"').replace(/'/g, "'"),
      difficulty: q.difficulty
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    questions = [];
  }
}

function promptPlayerName() {
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter your name";
  nameInput.style.margin = "10px";
  nameInput.style.padding = "8px";
  nameInput.style.borderRadius = "5px";
  const submitNameBtn = document.createElement("button");
  submitNameBtn.textContent = "Submit Name";
  submitNameBtn.style.margin = "10px";
  startScreen.appendChild(nameInput);
  startScreen.appendChild(submitNameBtn);
  return new Promise(resolve => {
    submitNameBtn.addEventListener("click", () => {
      playerName = nameInput.value.trim() || "Anonymous";
      nameInput.remove();
      submitNameBtn.remove();
      resolve();
    });
  });
}

function startQuiz() {
  if (questions.length === 0) return;
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  score = 0;
  currentQuestionIndex = 0;
  difficulty = "easy";
  userAnswers = [];
  updateProgress();
  showQuestion();
  startTimer();
}

function startTimer() {
  timeLeft = 20;
  timerDisplay.textContent = `${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(null, questions[currentQuestionIndex].answer);
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.classList.remove("fade-in");
  void questionText.offsetWidth;
  questionText.classList.add("fade-in");
  questionText.innerHTML = question.q;
  answerButtons.innerHTML = "";
  questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
  difficultyBadge.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  difficultyBadge.className = `difficulty-badge ${difficulty}`;
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerHTML = option;
    btn.addEventListener("click", () => selectAnswer(option, question.answer));
    answerButtons.appendChild(btn);
  });
}

function selectAnswer(selected, correct) {
  clearInterval(timer);
  userAnswers.push({ question: questions[currentQuestionIndex].q, selected, correct });
  if (selected === correct) {
    score++;
    if (difficulty === "easy") difficulty = "medium";
    else if (difficulty === "medium") difficulty = "hard";
  } else {
    navigator.vibrate?.(100);
    if (difficulty === "hard") difficulty = "medium";
    else if (difficulty === "medium") difficulty = "easy";
  }
  currentQuestionIndex++;
  updateProgress();
  currentQuestionIndex < totalQuestions ? (showQuestion(), startTimer()) : endQuiz();
}

function updateProgress() {
  const percent = (currentQuestionIndex / totalQuestions) * 100;
  progressFill.style.width = `${percent}%`;
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  reviewScreen.classList.remove("hidden");
  leaderboard.push({ name: playerName, score });
  if (leaderboard.length > 100) leaderboard.shift();
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
  reviewList.innerHTML = "";
  userAnswers.forEach((ans, index) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <div class="review-question">Q${index + 1}: ${ans.question}</div>
      <div>Your Answer: <span class="${ans.selected === ans.correct ? 'correct-answer' : 'wrong-answer'}">${ans.selected || 'None'}</span></div>
      <div>Correct Answer: <span class="correct-answer">${ans.correct}</span></div>
    `;
    reviewList.appendChild(div);
  });
  if (score >= 4) confetti();
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

startBtn.addEventListener("click", async () => {
  await promptPlayerName();
  const token = await getSessionToken();
  await fetchQuestions(token);
  startQuiz();
});

restartBtn.addEventListener("click", () => {
  reviewScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

displayLeaderboard();