// Outstanding works:
//view test history

const questionContainer = document.querySelector("#question-container");
const startGameBtn = document.querySelector("#start-game");
const viewScoresBtn = document.querySelector("#view-scores");
const header = document.querySelector("header");
const timerEl = document.querySelector("#timer");
const questionSelect = document.querySelector("footer");

let questionAmount = 0;
let scoreListToggle = 0;
let responses = [];
let points = 0;
let answerObj = {

    q1: "JavaScript",
    q2: "A Monash coding bootcamp",
    q3: "I go hard in the edX",
    q4: "All of the above",
    q5: "Curly brackets",

}

function init() {

    // Event Listener: Start Game

    startGameBtn.addEventListener("click", function () {

        console.log("Start button pressed!");
        startGame();

    });

    // Event Listener: View Quiz History

    viewScoresBtn.addEventListener("click", function () {

        console.log("View Scores button pressed!");

        if (localStorage.getItem("userInitials") === null) {

            console.log("Do nothing");

        } else {

            if (scoreListToggle === 0) {

                scoreListToggle = 1;

                let lSInitials = localStorage.getItem("userInitials").split(",");
                let lSScore = localStorage.getItem("userScore").split(",");

                //create ol
                let scoreList = document.createElement("ul");
                scoreList.setAttribute("id", "score-list");

                //create li
                let scoreListItem = [];

                //loop li append with results

                for (let i = 0; i < lSInitials.length; i++) {

                    scoreListItem[i] = document.createElement("li");
                    scoreListItem[i].textContent = `${lSInitials[i]}: ${lSScore[i]}`;
                    scoreList.append(scoreListItem[i]);;

                }

                this.append(scoreList);

            } else {

                scoreListToggle = 0;
                document.querySelector("#score-list").remove();

            }

        }



    });


}

function createQuestion(question, responses) {

    questionAmount++; //Adds +1 for "section id" purposes seen in create section and append all of this function.

    //create section

    const sectionEl = document.createElement("section");
    sectionEl.setAttribute("id", "q" + questionAmount);

    //create question
    const questionEl = document.createElement("h2");
    questionEl.textContent = question;

    //create responses
    const ulEl = document.createElement("ul");
    let responseEl = [];

    //append all

    questionContainer.appendChild(sectionEl);
    const sectionIdEl = document.querySelector("#q" + questionAmount);
    sectionIdEl.appendChild(questionEl);
    sectionIdEl.appendChild(ulEl);

    for (let i = 0; i < responses.length; i++) { //Render list items to page

        responseEl[i] = document.createElement("li"); //Create list item
        responseEl[i].textContent = responses[i]; //Add response to list item
        sectionIdEl.children[1].appendChild(responseEl[i]); //Append list item

    }

}

function startGame() {

    let timeLeft = 60; //Set time limit
    const timeSubtract = 20; //How much time will be removed for an incorrect answer

    //Create pages with questions and answers
    createQuestion("Of the four languages, which is the best programming language?", responses = ["Java (Is that even a language?)", "JavaScript", "C", "Python"]);
    createQuestion("What do you want for Christmas?", responses = ["1 trillion dollars", "A fluffy puppy", "A new house", "A Monash coding bootcamp"]);
    createQuestion("Do you even script, bro?", responses = ["Like, Java?", "No", "I go hard in the edX", "I'm a lvl 99 warlock, I don't need no script."]);
    createQuestion("Arrays in JavaScript can be used to store...", responses = ["Integers", "Strings", "Arrays", "All of the above"]);
    createQuestion("The condition in an if/else statement is enclosed with...", responses = ["Curly brackets", "Double quotes", "Single quotes", "Colons"]);

    window.location = "#q1"; //Send to question 1 page

    //Adds question number buttons to footer
    let questionSelectArray = [];

    for (let i = 0; i < questionAmount; i++) {

        questionSelectArray[i] = document.createElement("span"); //Create span
        questionSelectArray[i].textContent = i + 1; //Add the question number to the span
        questionSelectArray[i].setAttribute("href", "#q" + (i + 1)); //Attach the href where the button will send the page
        questionSelect.appendChild(questionSelectArray[i]); //Render page button

        questionSelectArray[i].addEventListener("click", function () {

            window.location = questionSelectArray[i].getAttribute("href");

        });

    }

    //Depending on the page that is in the viewport, the selected answer will log itself to answerObj and send the user to the next question.
    const listItem = document.querySelectorAll("li");
    for (let i = 0; i < listItem.length; i++) {

        listItem[i].addEventListener("click", function () {

            //find out page id
            let whatIsMyId = listItem[i].parentNode.parentNode.getAttribute("id");

            //Is the answer correct?
            if (listItem[i].textContent === answerObj[whatIsMyId]) { //If yes...

                //add point
                points++;

                //function to send to next page
                window.location = "#" + nextPage(whatIsMyId);

            } else { //If no...

                //render -20 notifier
                let removeTimeEl = document.createElement("span");
                removeTimeEl.setAttribute("id", "subtract-time");
                removeTimeEl.setAttribute("style", "opacity: 1;");
                removeTimeEl.textContent = "-" + timeSubtract + " Incorrect!";

                header.appendChild(removeTimeEl);

                let incorrectRemove = setInterval(() => { //Reduce opacity over time and remove the element when opacity is 0.

                    if (removeTimeEl.style.opacity <= 0) {

                        clearInterval(incorrectRemove);
                        removeTimeEl.remove();

                    } else if (removeTimeEl.style.opacity > 0) {

                        removeTimeEl.style.opacity -= 0.05;

                    }

                }, 100);

                //remove 20 seconds from time left.
                timeLeft -= timeSubtract;

            }

        });

    }

    //Timer
    let timer = setInterval(() => {

        if (points === 5 || timeLeft <= 0) {

            timeLeft = 0;

            while (questionSelect.children[0]) {

                questionSelect.children[0].remove();

            }

            timerEl.remove();

            endGameScreen();

            clearInterval(timer);

        }

        timerEl.textContent = timeLeft;
        timeLeft--;

    }, 1000);


}

function endGameScreen() {

    let endGameEl = document.createElement("section");
    endGameEl.setAttribute("id", "end-game");
    questionContainer.append(endGameEl);

    window.location = "#end-game";

    endGameEl.innerHTML += "<h1>Good Game!</h1>";
    endGameEl.innerHTML += `<p>Your score was ${points}/${questionAmount}</p>`;
    endGameEl.innerHTML += "<p>Type in your initials in the box below and submit your results!  We will not share your data with anyone... just Google.</p>";
    endGameEl.innerHTML += '<input type="text" id="initials" />';
    endGameEl.innerHTML += '<button id="submit" class="btn btn-neutral">Submit</button>';

    const submitBtn = document.querySelector("#submit");
    const initialsField = document.querySelector("#initials");

    submitBtn.addEventListener("click", () => {

        console.log("Submit button clicked!");

        localStoragePush(initialsField.value.toUpperCase());

        window.location = "index.html";

    });

}

function localStoragePush(initialsField) {

    let userInitialsArray = [];
    let userScoreArray = [];

    let lSInitials = localStorage.getItem("userInitials");
    let lSScore = localStorage.getItem("userScore");

    if (lSInitials === null && lSScore === null) { // If there's no localStorage data, create one and add to it.

        userInitialsArray.push(initialsField);
        localStorage.setItem("userInitials", userInitialsArray);
        userScoreArray.push(points);
        localStorage.setItem("userScore", userScoreArray);

    } else { //If there's previous localStorage data, add to it.

        let newUserInitialsArray = userInitialsArray.concat(lSInitials);
        let newUserScoreArray = userScoreArray.concat(lSScore);

        newUserInitialsArray.push(initialsField);
        localStorage.setItem("userInitials", newUserInitialsArray);
        newUserScoreArray.push(points);
        localStorage.setItem("userScore", newUserScoreArray);

    }

}

function nextPage(id) {

    let nextPage = "";

    switch (id) {
        case "q1":
            return "q2";
        case "q2":
            return "q3";
        case "q3":
            return "q4";
        case "q4":
            return "q5";
        // case "q5":
        //     return "landing";
    }

}

init();