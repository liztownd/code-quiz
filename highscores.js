var question = document.getElementById("question");

function renderHighScores() {

    var storedScores = JSON.parse(localStorage.getItem("scores"));
    console.log(storedScores)
        //var renderedScores = highScores.flat(highScores.length - 1);

        if (storedScores === null){
            var emptyDiv = document.createElement("h3");
            emptyDiv.textContent = "No scores stored - press Home to play and add your score!";
            question.appendChild(emptyDiv);
        } 
        
        else{

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
    
            window.location.href = "index.html"
            return false; 
        }
    
        clearScoresBtn.onclick = function () {
        
            localStorage.clear();
            window.location.reload();
    
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