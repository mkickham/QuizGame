const questions = [
    {
        question: "What does Javascript allow you to do?", 
        answers: [
            {text: "Style websites", correct: false},
            {text: "Store data on the internet", correct: false},
            {text: "Add interaction our website", correct: true},
            {text: "Connect with family and friends", correct: false},
        ]
    },

    {
        question: "What is the tag to add Javascript to an HTML file?", 
        answers: [
            {text: "Java", correct: false},
            {text: "script", correct: true},
            {text: "JS", correct: false},
            {text: "animate", correct: false},
        ]
    },

    {
        question: "How would you demonstrate something being equal in both type and value?", 
        answers: [
            {text: "!==", correct: false},
            {text: "===", correct: true},
            {text: "=/=", correct: false},
            {text: "@=", correct: false},
        ]
    },

    {
        question: "What does DOM mean in Javascript?", 
        answers: [
            {text: "Dominant Object Motion", correct: false},
            {text: "Defense Ordinance Maneuver", correct: false},
            {text: "Document Object Model", correct: true},
            {text: "Direct Opulence Manipulation", correct: false},
        ]
    },

    {
        question: "How would you comment in Javascript?", 
        answers: [
            {text: "--", correct: false},
            {text: "./", correct: false},
            {text: "!_+", correct: false},
            {text: "//", correct: true},
        ]
    },

    {
        question: "Which of the following is considered a conditional statement?", 
        answers: [
            {text: "yes/no", correct: false},
            {text: "so/that", correct: false},
            {text: "let/be", correct: false},
            {text: "if/for", correct: true},
        ]
    },

    {
        question: "This is a Javascript library designed to make coding easier", 
        answers: [
            {text: "jQuery", correct: true},
            {text: "JavaJava", correct: false},
            {text: "Javasprint", correct: false},
            {text: "JavaGuide", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
var time = 60;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState(){
    nextButton.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        time = time-5
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ' + score + ' out of 7!';
    questionElement.innerHTML += '<input id="finScore"> <button id="finBtn">save</button>';
    document.getElementById("finBtn").addEventListener("click", finalScore)
    clearInterval(timerId)
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display();
}

function finalScore(){
    var finScore = document.getElementById('finScore').value;
    console.log("Final Score " + finScore);
    localStorage.setItem("highScore", finScore + time)
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
    
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

var timerId = setInterval(function(){
    var timer = document.getElementById('countdown-timer');
    console.log(time);
    time--
    timer.textContent = time
    if(time <= 0){
        console.log('gameover');
        clearInterval(timerId);
    }
},1000)



startQuiz();