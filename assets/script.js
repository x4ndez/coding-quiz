const questionContainer = document.querySelector("#question-container");
const startGameBtn = document.querySelector("#start-game");

let questionAmount = 0;
let responses = [];

// function mainMenu() {

//     while (questionContainer.firstChild) { //Clear the container

//         questionContainer.removeChild(questionContainer.firstChild);

//     }

//     const startGameBtnEl = document.createElement("button");
//     startGameBtnEl.
//     const startGameBtn = document.querySelector("#start-game");



// }

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

    const listItem = sectionIdEl.children[1].children;

    console.log(listItem);

    //Add event listener for list items

    // listItem.addEventListener("click", function () {

    //     console.log("List Item presses!");

    // });

}

function startGame() {

    createQuestion("lol", responses = ["a", "b", "c", "d"]);
    window.location = "#q1";

}

// createQuestion("lol", responses = ["a", "b", "c", "d"]);
// createQuestion("lol", responses = ["a", "b", "c", "d"]);

init();