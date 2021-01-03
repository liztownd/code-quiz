var question = document.getElementById("question");

function renderHighScores() {

    // flat doesn't work after 4 iterations...
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    console.log(storedScores)
        //var renderedScores = highScores.flat(highScores.length - 1);

        if (storedScores === null){
            console.log("TYUIKMNBVGH");
            var emptyDiv = document.createElement("h2");
            emptyDiv.textContent = "No scored stored";
            question.appendChild(emptyDiv);
        } else{

        for (j = 0; j < storedScores.length; j++) {
    
    
            var scoreDiv = document.createElement("div");
            scoreDiv.setAttribute("class", "scoreDiv");
    
            scoreDiv.textContent = "Score: " + storedScores[j].score + " --------- by " + storedScores[j].init;
            question.append(scoreDiv);
    
        }
    } //else closing
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
            window.location.href = "index.html"
            return false; 
        }
    
        clearScoresBtn.onclick = function () {
    
           // var clear = scoreDiv.textContent = "";
    
            localStorage.clear();
            window.location.reload();
    
    
    // clear contents - not working
    
            question.append(clear);
            renderHighScores();
    
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
    
    
    renderHighScores();