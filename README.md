# 🎯 Adaptive Quiz
A dynamic, interactive front-end web app for a trivia quiz with adaptive difficulty, a leaderboard, 
dark mode, and answer review. Powered by the Open Trivia Database (OpenTDB) API 🌐, it fetches 
random questions and adjusts difficulty based on your performance 🚀.

### ✨ Features

* Adaptive Difficulty 🧠: Questions scale from easy ➡️ medium ➡️ hard for correct answers, or regress for incorrect ones.
* Leaderboard 🏆: Tracks top 5 player scores with names, stored in browser local storage.
* Dark Mode 🌙: Toggle between light and dark themes for a comfortable experience.
* Timer ⏱️: 20-second countdown per question, with auto-submission if time runs out.
* Answer Review 📝: Post-quiz screen shows your answers, correct answers, and feedback.
* Confetti Celebration 🎉: Fun visual reward for scoring 4+ out of 5 questions.
* Mobile-Friendly 📱: Responsive design with vibration feedback for incorrect answers on supported devices.
* Session Token 🔑: Uses OpenTDB session tokens to ensure unique questions across sessions.

### 🛠️ Technologies

* HTML5 📄: Structures the quiz interface.
* CSS3 🎨: Styles with gradients, animations, and responsive design.
* JavaScript (ES6) 💻: Handles logic, API calls, and local storage.
* OpenTDB API 🌍: Fetches 20 random multiple-choice trivia questions per quiz.
* Canvas Confetti 🎊: Adds celebratory effects for high scores.

## 🚀 Setup

### 📋 Prerequisites

* A modern web browser (Chrome, Firefox, Safari, etc.) 🖥️.
* Internet connection for API requests 🌐.
* Optional: Local server (e.g., Live Server in VS Code) for development 🛠️.

### 📦 Installation

#### Clone or Download 📥:

1. Clone the repository or download the files.

    git clone https://github.com/govind-553/adaptive-quiz.git


2. Project Structure 📂:
    adaptive-quiz/
    ├── index.html        # Main HTML file 📄
    ├── style.css         # Styling 🎨
    ├── script.js         # Logic & API integration 💻
    └── README.md         # Project documentation 📖


3. Run the Application ▶️:

* Open index.html in a browser, or use a local server:npx live-server
* Ensure internet access for API requests via the AllOrigins proxy 🔗.

### 🎮 Usage

#### Start Screen 🖥️:

1. Enter your name and click "Submit Name" ✍️.
2. Click "Start Quiz" to begin ▶️.
3. View the leaderboard with the top 5 scores 🏆.


#### Quiz ❓:

* Answer 5 multiple-choice questions within 20 seconds each ⏱️.
* Difficulty adjusts based on performance (easy ➡️ medium ➡️ hard, or vice versa) 🔄.
* Incorrect answers trigger a brief vibration on supported devices 📳.


#### Review Screen 📊:

* See your answers, with correct ✅ and incorrect ❌ responses highlighted.
* Click "Restart Quiz" to return to the start screen 🔙.


#### Dark Mode 🌙:

Toggle dark mode with the "Dark Mode" button for better visibility: 
  * 🖼️ Start Screen: Name input and leaderboard.
  * ❓ Quiz Screen: Question with timer and options.
  * 📝 Review Screen: Answer feedback.
  * 🌙 Dark Mode: Alternate theme.

### 🔮 Future Improvements

* ➕ Add category selection for OpenTDB API questions.
* 🌐 Implement a backend for global leaderboard storage.
* 🚨 Enhance error handling with user-friendly API failure messages.
* 🔊 Add sound effects for correct/incorrect answers and quiz completion.

### 🙌 Acknowledgments

* OpenTDB for the awesome trivia API 🌟.
* Canvas Confetti for fun celebration effects 🎉.
* AllOrigins for reliable CORS proxy support 🔗.


##### Built with ❤️ by [Govind Choudhari]Last updated: May 17, 2025 📅
