// Outstanding works:
//Timer & correction
//end game
//footer
//view test history
//local storage

const questionContainer = document.querySelector("#question-container");
const startGameBtn = document.querySelector("#start-game");
const header = document.querySelector("header");
const timerEl = document.querySelector("#timer");
const questionSelect = document.querySelector("footer");

let questionAmount = 0;
let responses = [];
let answerObj = {

    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",

}

function init() {

    // Event Listener: Start Game

    startGameBtn.addEventListener("click", function () {

        console.log("Start button pressed!");
        startGame();

    });

    // Event Listener: View Quiz History

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

    //Create pages with questions and answers
    createQuestion("lol", responses = ["a", "b", "c", "d"]);
    createQuestion("lol", responses = ["a", "b", "c", "d"]);
    createQuestion("lol", responses = ["a", "b", "c", "d"]);
    createQuestion("lol", responses = ["a", "b", "c", "d"]);
    createQuestion("lol", responses = ["a", "b", "c", "d"]);

    window.location = "#q1"; //Send to question 1 page

    //Adds question numbers to footer
    let questionSelectArray = [];

    for (let i = 0; i < questionAmount; i++) {

        questionSelectArray[i] = document.createElement("span");
        questionSelectArray[i].textContent = i + 1;
        questionSelectArray[i].setAttribute("href", "#q" + (i + 1));
        questionSelect.appendChild(questionSelectArray[i]);

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
            //function to log answer in an object
            answerObj[whatIsMyId] = listItem[i].textContent;
            //function to send to next page
            window.location = "#" + nextPage(whatIsMyId);

            console.log(answerObj);

        });

    }

    //Timer
    let timer = setInterval(() => {

        if (questionAmount === 10) {

            console.log("FINISH");
            clearInterval(timer);

        } else if (timeLeft === 0) {

            console.log("LOSE");
            clearInterval(timer);

        }

        timerEl.textContent = timeLeft;
        timeLeft--;

    }, 1000);

    //Submit Answers


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
        case "q5":
            return "landing";
    }

}

init();