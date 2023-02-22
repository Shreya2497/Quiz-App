const startBtn=document.getElementById('start-btn');
const nextBtn=document.getElementById('next-btn');
const questionContainerElement=document.getElementById('question-container');
const questionElement=document.getElementById('question');
const answerButtonElement=document.getElementById('answer-btn');

let shuffleQuestions,currentQuestionIndex;
let quizScore=0;

startBtn.addEventListener("click",startGame)

nextBtn.addEventListener("click",()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startBtn.classList.add('hide');
    shuffleQuestions= questions.sort(() => Math.random() - 0.5);
    console.log(Math.random() - 0.5)
    currentQuestionIndex=0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore=0;
}

function setNextQuestion(){
resetState();
showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
questionElement.innerText=question.question;
question.answers.forEach((answer)=>{
    const button=document.createElement('button')
    button.innerText=answer.text;
    button.classList.add("btn")
    if(answer.correct){
        button.dataset.correct=answer.correct
    }
    button.addEventListener('click',selectAnswer)
    answerButtonElement.appendChild(button)
})
}

function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn= e.target;
    const correct = selectedBtn.datset.correct;

    setStatusCLass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button)=>{
        setStatusCLass(button, button.datset.correct);
    });
    if(correct){
    if(shuffleQuestions.length > currentQuestionIndex +1){
        nextBtn.classList.remove("hide");
    }
    else{
        startBtn.innerText="Restart";
        startBtn.classList.remove("hide");
    }
    if(selectedBtn.datset=correct){
        quizScore++;
    }
    document.getElementById('right-answer').innerText= quizScore;
}
}


function setStatusCLass(element, correct){
clearStatusClass(element);
if(correct){
    element.classList.add('correct')
}
else{
    element.classList.add('wrong')
}
}


function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions=[
{
    question:'Which one of these is a JavaScript Framework?',
    answers :[
        { text:'Python',correct:false},
        { text:'Django',correct:false},
        { text:'React',correct:true},
        { text:'Eclipse',correct:false}
    ],
},
{
    question:'Correct br statement',
    answers :[
        { text:'<br>',correct:true},
        { text:'<p>',correct:false},
        { text:'<h1>',correct:false},
        { text:'\n',correct:false}
    ]
},
{
    question:'Correct CSS statement',
    answers :[
        { text:'btn{color:red}',correct:false},
        { text:'btn{color:red;}',correct:true},
        { text:'.btn{color:red}',correct:false},
        { text:'btn[color:red]',correct:false}
    ],
},

]

