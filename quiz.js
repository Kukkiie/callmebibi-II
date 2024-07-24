const questions = [
    {
        question: "Which one is my last name?",
        answers: [
            {text: "Phangsangdi", correct: false},
            {text: "Saengphaengdi", correct: true},
            {text: "Kozlov", correct: false},
            {text: "Phaengdi", correct: false},
        ]
    },
    {
        question: "What is the song I always sing when I'm with you?",
        answers: [
            {text: "He said one day you live the world behind~", correct: false},
            {text: "I wanna be peeee~", correct: false},
            {text: "Ewww Brother, Ewww! What's That Brother...", correct: false},
            {text: "I wanna be freeee~", correct: true},
        ]
    },
    {
        question: "Which one mean 'I have a fat ass!' in Thai?",
        answers: [
            {text: "Mung Si E Ka Toey", correct: false},
            {text: "Sa Wad Dee Kaaaaaaaa", correct: false},
            {text: "Pai Tor Lae Kan Kaaaa", correct: false},
            {text: "Chan Mee Tood Ouan", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
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
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    if(score === 3){
        questionElement.innerHTML = `🎉 CONGRATULATION 🎉 You score ${score} out of ${questions.length}! 🥹💗`;
        nextButton.innerHTML = "Go on a date!"; 
        nextButton.style.display = "block";
    } 
    else{
        questionElement.innerHTML = `You score ${score} out of ${questions.length}! 😔`;
        nextButton.innerHTML = "Go on a date!"; 
        nextButton.style.display = "block";
    }
}

function nextPage() {
    window.location.href = "date.html";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        nextPage();
    }
});

startQuiz();