// Quiz Data
const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
    { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], correct: 3 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets", "Computer Style Sheets"], correct: 0 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "Who wrote 'Harry Potter'?", options: ["J.K. Rowling", "Tolkien", "Shakespeare", "Mark Twain"], correct: 0 },
    { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 2 },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: 2 },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Hot Mail", "How To Make Language", "None"], correct: 0 },
    { question: "Which year did WW2 end?", options: ["1945", "1939", "1918", "1941"], correct: 0 },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let attempted = 0;
  let skipped = 0;
  const questionContainer = document.getElementById('question-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const resultContainer = document.getElementById('result');
  const attemptedCount = document.getElementById('attempted-count');
  const skippedCount = document.getElementById('skipped-count');
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionContainer.innerHTML = `
      <h3>${q.question}</h3>
      ${q.options
        .map(
          (opt, i) =>
            `<label>
              <input type="radio" name="question${currentQuestion}" value="${i}">
              ${opt}
            </label><br>`
        )
        .join('')}
    `;
  }
  function trackAnswers() {
    const selectedOption = document.querySelector(
      `input[name="question${currentQuestion}"]:checked`
    );
  
    if (selectedOption) {
      attempted++;
      if (parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
        score++; 
      }
    } else {
      skipped++;
    }
    attemptedCount.textContent = attempted;
    skippedCount.textContent = skipped;
  }
  nextBtn.addEventListener('click', () => {
    trackAnswers();
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
    if (currentQuestion === quizData.length - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'block';
    }
    prevBtn.disabled = currentQuestion === 0;
  });
  prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
      nextBtn.style.display = 'block';
      submitBtn.style.display = 'none';
    }
    prevBtn.disabled = currentQuestion === 0;
  });
  submitBtn.addEventListener('click', () => {
    trackAnswers();
    questionContainer.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `<h2>Your Score: ${score} / ${quizData.length}</h2>`;
  });
  loadQuestion();
  
  