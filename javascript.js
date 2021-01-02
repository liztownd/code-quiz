var timeEl = document.getElementById("timeLeft");
var main = document.getElementById("main");
var question = document.getElementById("question");
var choices = document.getElementById("choices")
var viewHighScores = document.getElementById("viewHighScores");

var timeLeft = 90;
var index = 0;
var endGame = false;
var highScores = [
    {
        score: 0,
        init: "",
    }
];


var intro = {
    introText: "Answer the questions within the time provided. For every wrong answer you lose 10 seconds on the timer - the time on the timer when the last question is answered is your score! Click start when ready. Good luck!",
};

var questions = [
    {
        question: "what is today?",
        choices: ["mon", "sun", "yues", "sat"],
        answer: "sun"
    },
    {
        question: "what is dog?",
        choices: ["cat", "sun", "dog", "sat"],
        answer: "dog"
    },

];

initialize();



function checkAnswer() {
    //check if users response is correct or incorrect
    //if incorrect deduct time
    //corect just display correct
    if (this.value !== questions[index].answer) {
        //incorrect
        timeLeft = timeLeft - 10;
        timeEl.textContent = timeLeft;

    } else {

    };

    index++;

    if (index === questions.length) {
        //no more questions
        //end game
        highScore();
        endGame = true;

    }

    else {
        getQuestion();
    }
    //move to next question, if possible
    //if no new question just end the game
};

function getQuestion() {
    question.textContent = questions[index].question;
    choices.innerHTML = "";
    var options = questions[index].choices;

    for (let i = 0; i < options.length; i++) {
        //create a button
        var btn = document.createElement("button");
        btn.textContent = options[i];
        //assign it value
        btn.setAttribute("value", options[i]);
        //asign it a class name
        btn.setAttribute("class", "choices");
        //attach an onclick (call a function to check users answer)
        btn.onclick = checkAnswer;
        //append
        choices.appendChild(btn)
    }
}


function startGame() {

    //hide startBtn and welcome
    question.innerHTML = "";
    choices.innerHTML = "";
    //setup timer
    setTime();
    //call function to get questions
    getQuestion();
}

function initialize() {
    //clear previous content
    //display welcome
    //create button
    //display both items
    question.textContent = intro.introText;
    var startBtn = document.createElement("button");
    startBtn.setAttribute("id", "startBtn");
    startBtn.textContent = "Start";
    startBtn.onclick = startGame;
    choices.append(startBtn);
    timeEl.textContent = timeLeft;

};


function renderHighScores() {

    var renderedScores = highScores.flat(highScores.length - 1);


    for (j = 0; j < renderedScores.length; j++) {


        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("class", "scoreDiv");

        scoreDiv.textContent = "Score: " + renderedScores[j].score + " --------- by " + renderedScores[j].init;
        question.append(scoreDiv);

    }

    var startOverBtn = document.createElement("button");
    startOverBtn.setAttribute("id", "startOverBtn");
    startOverBtn.textContent = "Home";

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("id", "clearScoresBtn");
    clearScoresBtn.textContent = "Clear Scores";

    choices.append(startOverBtn);
    choices.append(clearScoresBtn);

    startOverBtn.onclick = function () {

        location.reload();
        return false; 
    }

    clearScoresBtn.onclick = function () {

        questions.textContent = "";

        localStorage.clear();

    }

};

function getStoredScores() {

    if (localStorage.getItem("scores") === null) {
        return
    }

    else {


        var storedScores = JSON.parse(localStorage.getItem("scores"));

        console.log(storedScores);

        highScores.push(storedScores);
    }

};


function highScore() {


    question.textContent = "";
    choices.innerHTML = "";

    var hsDiv = document.createElement("div");
    hsDiv.textContent = "High Scores";
    hsDiv.setAttribute("class", "h2");
    question.prepend(hsDiv);

    var initInput = document.createElement("input");
    initInput.setAttribute("id", initInput);
    initInput.setAttribute("placeholder", "Enter Initials")

    var submitBtn = document.createElement('input');
    submitBtn.type = 'button';
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.value = 'Submit';
    submitBtn.className = 'btn';


    choices.append(initInput);
    choices.append(submitBtn)


    submitBtn.onclick = (function (event) {
        event.preventDefault();

        var newScores = {
            score: 0,
            init: "",
        }

        newScores.score = timeLeft;
        newScores.init = initInput.value;

        getStoredScores();


        highScores.push(newScores);


        choices.textContent = "";

        console.log(highScores)

        renderHighScores()

        var storedScores = (JSON.stringify(highScores));


        localStorage.setItem("scores", storedScores);


    }
    );
}

viewHighScores.onclick = function () {

    question.textContent = "";
    choices.innerHTML = "";

    getStoredScores();
    renderHighScores();

}


function setTime() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            highScore();
        }

        else if (endGame === true) {
            clearInterval(timerInterval);
        }

    }, 1000);
}
