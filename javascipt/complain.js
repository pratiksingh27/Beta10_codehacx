const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const addRaggingComplain = document.getElementById("add-ragging-complain");
const addHostelComplain = document.getElementById("add-hostel-complain");
const addOtherComplain = document.getElementById("add-other-complain");
const closeBtnMess = document.getElementById("close-btn-mess");
const closeBtnRagging = document.getElementById("close-btn-ragging");
const closeBtnHostel = document.getElementById("close-btn-hostel");
const closeBtnOther= document.getElementById("close-btn-other");

let editBool = false;

//Add question when user clicks 'Add Flashcard' button
const mess = document.querySelector("#mess");

 mess.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addHostelComplain.classList.add("hide");
  addOtherComplain.classList.add("hide");
  addRaggingComplain.classList.add("hide");
  addQuestionCard.classList.remove("hide");
});

const ragging = document.querySelector("#ragging");
let raggingForm = document.querySelector(".mess");

 ragging.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.add("hide");
  addHostelComplain.classList.add("hide");
  addOtherComplain.classList.add("hide");
  addRaggingComplain.classList.remove("hide");
});

const other = document.querySelector("#other");

 other.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.add("hide");
  addHostelComplain.classList.add("hide");
  addRaggingComplain.classList.add("hide");
  addOtherComplain.classList.remove("hide");
});
const hostel = document.querySelector("#hostel");

 hostel.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.add("hide");
  addRaggingComplain.classList.add("hide");
  addOtherComplain.classList.add("hide");
  addHostelComplain.classList.remove("hide");
});

//Hide  flashcard Card
closeBtnMess.addEventListener(
  "click",
  (hideQuestion = () => {
    // container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

closeBtnRagging.addEventListener(
    "click",
    (hideQuestion = () => {
      container.classList.remove("hide");
      addRaggingComplain.classList.add("hide");
      if (editBool) {
        editBool = false;
        submitQuestion();
      }
    })
  );


  closeBtnHostel.addEventListener(
    "click",
    (hideQuestion = () => {
      container.classList.remove("hide");
      addHostelComplain.classList.add("hide");
      if (editBool) {
        editBool = false;
        submitQuestion();
      }
    })
  );

  closeBtnOther.addEventListener(
    "click",
    (hideQuestion = () => {
      container.classList.remove("hide");
      addOtherComplain.classList.add("hide");
      if (editBool) {
        editBool = false;
        submitQuestion();
      }
    })
  );

//Submit Question
cardButton.addEventListener(
  "click",
  (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      viewlist();
      question.value = "";
      answer.value = "";
    }
  })
);

//Card Generate
function viewlist() {
  var listCard = document.getElementsByClassName("card-list-container");
  var div = document.createElement("div");
  div.classList.add("card");
  //Question
  div.innerHTML += `
  <p class="question-div">${question.value}</p>`;
  //Answer
  var displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div", "hide");
  displayAnswer.innerText = answer.value;

  //Link to show/hide answer
  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
  link.addEventListener("click", () => {
    link.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
    displayAnswer.classList.toggle("hide");
  });

  div.appendChild(link);
  div.appendChild(displayAnswer);

  //Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  //Delete Button
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);
  hideQuestion();
}

//Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};


 // animation of aside menu
const navToggleBtn = document.querySelector(".nav-toggle"),
    aside = document.querySelector(".aside");
navToggleBtn.addEventListener("click", () => {
    asideSectionToggleBtn();
})
function asideSectionToggleBtn() {
    aside.classList.toggle("open");
    navToggleBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}