const questionContainer = document.querySelector("#question-container");

let questionAmount = 0;
let responses = [];

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
    const responseEl01 = document.createElement("li");
    const responseEl02 = document.createElement("li");
    const responseEl03 = document.createElement("li");
    const responseEl04 = document.createElement("li");

    // for (let i = 0; i < responses.length; i++) {


    // }

    //append all

    questionContainer.appendChild(sectionEl);
    const sectionIdEl = document.querySelector("#q" + questionAmount);
    sectionIdEl.appendChild(questionEl);
    sectionIdEl.appendChild(ulEl);

    responseEl01.textContent = responses[0];
    sectionIdEl.children[1].appendChild(responseEl01);
    responseEl02.textContent = responses[1];
    sectionIdEl.children[1].appendChild(responseEl02);
    responseEl03.textContent = responses[2];
    sectionIdEl.children[1].appendChild(responseEl03);
    responseEl04.textContent = responses[3];
    sectionIdEl.children[1].appendChild(responseEl04);

}

;
createQuestion("lol", responses = ["a", "b", "c", "d"]);
createQuestion("lol", responses = ["a", "b", "c", "d"]);