const questions = [
    {
        question: "1. ما هي اكبر قارة في العالم؟",
        answers: [
            {text:"افريقيا", correct: false},{text:"أسيا", correct: true},
            {text:"امريكا الجنوبية", correct: false},{text:"استراليا", correct: false}
        ]
    },
    {
        question: "2. ما هي عاصمة فلسطين ؟",
        answers: [
            {text:"غزة", correct: false},{text:"القدس", correct: true},
            {text:"الخرطوم", correct: false},{text:"الرياض", correct: false}
        ]
    },
    {
        question: "3. ما هي عاصمة مصر ؟",
        answers: [
            {text:"الإسكندرية", correct: false},{text:"القاهرة", correct: true},
            {text:"الجيزة", correct: false},{text:"كفر تصففا", correct: false}
        ]    
    },
    {
        question: "4. اين توجد مكة ؟",
        answers: [
            {text:"السعودية", correct: true},{text:"فلسطين", correct: false},
            {text:"الجزائر", correct: false},{text:"مصر", correct: false}
        ]
    },
    {
        question: "5. ما هي عاصمة السودان ؟",
        answers: [
            {text:"غزة", correct: false},{text:"القدس", correct: false},
            {text:"الخرطوم", correct: true},{text:"الرياض", correct: false}
        ]
    }
]

let questionElement = document.querySelector(".question");
let btns = document.querySelector(".btns");
let next = document.querySelector(".next");
let newQuiz = document.querySelector(".new");
let num = document.querySelector(".num");
let h1 = document.querySelector("h1");

console.log(questionElement)
let currentQuestion = 0;
let score = 0;

num.innerHTML = "test"
function startQuiz(){
    currentQuestion = 0;
    score = 0;
    next.innerHTML = "التالي";
    if(currentQuestion === 0){
        newQuiz.style.display = "none"
    }
    showQuestion();
}
function showQuestion(){
    num.innerHTML = `${currentQuestion + 1} من ${questions.length}`;
    questionElement.innerHTML = questions[currentQuestion].question;
    questions[currentQuestion].answers.forEach((a) => {
        let btn = document.createElement("button");
        btn.innerHTML = a.text;
        btn.classList.add("btn")
        btns.appendChild(btn);
        if(a.correct){
            btn.dataset.correct = a.correct; // ==> btn.dataset.correct = "true"
        }
        btn.addEventListener("click", function(e){
            let selectedBtn = e.target;
            let isCorrect = selectedBtn.dataset.correct === "true";
            if (isCorrect){
                score++;
                selectedBtn.classList.add("correct")
            }else{
                selectedBtn.classList.add("wrong")
            }
            Array.from(btns.children).forEach((b) => {
                if(b.dataset.correct === "true"){
                    b.classList.add("correct");
                }
                b.disabled = true;
            })
        })
    })
    
};
next.addEventListener("click", function(){
    currentQuestion++;
    if(currentQuestion < questions.length){
    sessionStorage.setItem("score", score);
    questionElement.innerHTML = "";
    btns.innerHTML = "";
    showQuestion()
}else {
    sessionStorage.setItem("score", score);
        h1.innerHTML = "النتيجة"
        questionElement.innerHTML = `لقد حصلت على ${sessionStorage.getItem("score")} من ${questions.length} الاسئلة`
    newQuiz.style.display = "block"
}

})
newQuiz.addEventListener("click", function(){
    questionElement.innerHTML = "";
    btns.innerHTML = "";
    startQuiz()
})

startQuiz()