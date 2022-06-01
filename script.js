const startButton = document.getElementById('start-btn')
const lobby = $("#lobby-place")
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, UserScore
let score = 0,wrong = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

$(document).ready(function(){
  const url = window.location.href
  const value = url.split('?')
  const userName = value[1].split("=")[1]
  const gameId = value[2]
  $(".nameSpan").text(userName)
  $(".idSpan").text(gameId)

});

function startGame() {
  startButton.classList.add('hide')
  lobby.addClass('hide')
  shuffledQuestions = questions.sort()
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct)
    score++
  else
    wrong++
  console.log(score,wrong)
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    // TODO: end screen
    UserScore = 100 - ((wrong / (score + wrong)) * 100)
    console.log(UserScore)
    const url = window.location.href
    const value = url.split('?')
    const userName = value[1].split("=")[1]
    const gameId = value[2]
    window.location.href = "./end.html?userName="+userName+"?scoreBoard="+UserScore*10+"";
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'T3 vakfının en karizmatik yetkilisi kimdir?',
    answers: [
      { text: 'Refik Söylemez', correct: true },
      { text: 'Önemsiz biri', correct: false },
      { text: 'Önemsiz başka biri', correct: false },
      { text: 'Önemsiz bambaşka biri', correct: false }
    ]
  },
  {
    question: 'YY nin en havalı C developerı kimdir? ',
    answers: [
      { text: 'Eren GÜN', correct: true },
      { text: 'Eren GÜN', correct: true },
      { text: 'Eren GÜN', correct: true },
      { text: 'Eren GÜN', correct: true }
    ]
  },
  {
    question: 'Etli ekmek hangi ilimizde meşhurdur? ',
    answers: [
      { text: 'Kastamonu', correct: true },
      { text: 'Konya', correct: true },
      { text: 'İstanbul', correct: false },
      { text: 'İzmir', correct: false }
    ]
  },
  {
    question: 'Teknofest bu yıl hangi ülkede yapılacaktır.',
    answers: [
      { text: 'İstanbul', correct: false },
      { text: 'Samsun', correct: true },
      { text: 'Trabzon', correct: false },
      { text: 'Giresun', correct: false }
    ]
  },
  {
    question: 'T3 vakfı hangi yıl kurulmuştur?',
    answers: [
      { text: '2013', correct: false },
      { text: '2000', correct: false },
      { text: '2015', correct: false },
      { text: '2016', correct: true }
    ]
  },
  {
    question: 'İstanbulda kaç adet deneyap atölyesi bulunmaktadır?',
    answers: [
      { text: '9', correct: false },
      { text: '10', correct: false },
      { text: '11', correct: true },
      { text: '12', correct: false }
    ]
  }
]
