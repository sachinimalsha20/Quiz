
timer();
function timer() {
     sec = 60;

    function updateSec() {
        sec--;
        if (sec < 10) {
            document.querySelector("text").innerHTML = `&nbsp${sec}`;
        } else {
            document.querySelector("text").innerHTML = sec;
        }
        if (sec === 0) {
            stopTimer();
            return quizOver();
        }
    }
    updateSec();

    var interval = setInterval(updateSec, 1000);

    function stopTimer() {
        clearInterval(interval);
    }
}

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer =document.querySelector(".answer-indicator");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz-box");
const resultBox=document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers=0;
let attempt=0;


//push the questions into qvailableQuestions Array
function setAvailableQuestions(){
    const totalQuestion=quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML ="Question "+(questionCounter+1)+" of "+quiz.length;

    //set number text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;
    //get the position of 'questionIndex' from the availableQuestion Array;
    const index1=availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1,1);

    //set options
    //get the length of options
    const optionLen =currentQuestion.options.length
    //push options into availableOptions Array
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML='';
    let animationDelay=0.15;
    //create options in HTML
    for (let i=0;i<optionLen;i++){
        //random option
        const optonIndex= availableOptions[Math.floor(Math.random()*availableOptions.length)];
        //get the position of 'optonIndex' from the 'availableOptions'
        const index2=availableOptions.indexOf(optonIndex);
        //remove the 'optonIndex' from the 'availableOptions', so that the option does not repeat
        availableOptions.splice(index2,1);
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[optonIndex];
        option.id=optonIndex;
        option.style.animationDelay=animationDelay+'s';
        animationDelay= animationDelay+0.15;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++;
}

//get the result of current attempt question
function getResult(element){
    const id=parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if(id===currentQuestion.answer){
        //set the greeen color to the correct option
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers)
    }
    else {
        //set the red color to the incorrect option
        element.classList.add("wrong");
        //add the indicator to incorrect mark
        updateAnswerIndicator("wrong");


        //if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}



//make all the options unclickable once the user select a option (RESTRICT THE USER TO USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen =optionContainer.children.length;
    for (let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion =quiz.length;
    for (let i=0; i<totalQuestion; i++){
        const indicator =document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter===quiz.length){
        console.log("quiz over")
        quizOver();

    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
    //hide quiz quizBox
    quizBox.classList.add("hide");
    //show result Box
    resultBox.classList.remove("hide");
    quizResult();

}
//get the quiz Result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML=quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswers;
    const percentage=(correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML=percentage.toFixed()+"%";
    resultBox.querySelector(".total-score").innerHTML=(correctAnswers*2)-(attempt-correctAnswers);

    resultBox.querySelector(".time").innerHTML=(60-sec)+" secounds";
    window.clearInterval(timer());
    sec="-";

}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers=0;
    attempt=0;

}
function tryAgainQuiz(){

    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBOx
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();


}


function startQuiz (){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide")
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicators of answer
    answersIndicator();

}

