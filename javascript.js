var timeEl = document.getElementById("timeLeft");
var main = document.getElementById("main");
var question = document.getElementById("question");
var choices = document.getElementById("choices")

var timeLeft = 90;
var index = 0;
var endGame = false;
var highScores = [
    {
        score: 5,
        init: "et",
    }
];

var intro = {
    introText: "Answer the questions within the time provided. For every wrong answer you lose 10 seconds on the timer! Click start when ready. Good luck!",
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
    //display welcome
    //create button
    //diplay both items
    question.textContent = intro.introText;
    var startBtn = document.createElement("button");
    startBtn.setAttribute("id", "startBtn");
    startBtn.textContent = "Start";
    startBtn.onclick = startGame;
    choices.append(startBtn);
    timeEl.textContent = timeLeft;

};


function renderHighScores() {

   for (j = 0; j < highScores.length; j++) {


        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("class", "scoreDiv");

       scoreDiv.textContent = "Score: " + highScores[j].score + " --------- by " + highScores[j].init;
        question.append(scoreDiv); 

    }


};

function highScore() {


    question.textContent = "";
    choices.innerHTML = "";

    var hsDiv = document.createElement("div");
    hsDiv.textContent = "High Scores";
    hsDiv.setAttribute("class", "h2");
    question.prepend(hsDiv);

 //   localStorage.getItem("scores");

  //  if ("scores" === true) {

  //      highScores = JSON.parse("scores");

  //  };


    var initInput = document.createElement("input");
    initInput.setAttribute("id", initInput);

    var submitBtn = document.createElement('input');
    submitBtn.type = 'button';
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.value = 'Submit';
    submitBtn.className = 'btn';


    choices.append(initInput);
    choices.append(submitBtn)


    submitBtn.onclick = (function (event) {
        event.preventDefault();
        console.log("test");

        var newScores = {
            score: 0,
            init: "",
        }

        newScores.score = timeLeft;
        newScores.init = initInput.value;

        highScores.push(newScores);

        choices.textContent = "";

        console.log(highScores)

        renderHighScores()

        //   var storedScores = (JSON.stringify(highScores));


        //  localStorage.setItem(storedScores);


    }
    );

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
