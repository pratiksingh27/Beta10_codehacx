import { app } from './firebaseconfig.js';
import { getDatabase, ref, child, push, update, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

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
const closeBtnOther = document.getElementById("close-btn-other");

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
  (() => {
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
  (() => {
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
  (() => {
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
  (() => {
    container.classList.remove("hide");
    addOtherComplain.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

//Submit Question
// cardButton.addEventListener(
//   "click",
//   (() => {
//     editBool = false;
//     tempQuestion = question.value.trim();
//     tempAnswer = answer.value.trim();
//     if (!tempQuestion || !tempAnswer) {
//       errorMessage.classList.remove("hide");
//     } else {
//       container.classList.remove("hide");
//       errorMessage.classList.add("hide");
//       viewlist();
//       question.value = "";
//       answer.value = "";
//     }
//   })
// );

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

let messComplainBtn = document.querySelector(".messComplainBtn");
messComplainBtn.addEventListener("click", function () {
  let messComplainRaise = document.querySelector(".messComplainRaise").value;
  let messComplainDescription = document.querySelector(".messComplainDescription").value;
  let messComplaintdoneBy = document.querySelector(".messComplaintdoneBy").value;

  if (messComplainRaise != "" && messComplainDescription != "" && messComplaintdoneBy != "") {
    const db = getDatabase();

    const userUid = `${localStorage.getItem("logged_in_user")}`;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `students/${localStorage.getItem("logged_in_user")}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const oldComplain = snapshot.val().complaint;
        const newComplain = `${oldComplain} <div class="complain_body">
        <h4>${snapshot.val().firstName} ${snapshot.val().lastName}</h4>
        <h5>${messComplainRaise}</h5>
        <p>${messComplainDescription}</p>
        <span><button class="query" style="background-color:blue;">solve</button><button class="query" style="background-color: red;">reject</button></span>
        </div>`

        const updates = {};
        updates['/students/' + userUid + '/complaint/'] = newComplain;

        swal("Forwaeded!", "Your complaint is forwarded!")
        .then((value) => {
          document.querySelector(".messComplainRaise").value = "";
          document.querySelector(".messComplainDescription").value = "";
          document.querySelector(".messComplaintdoneBy").value = "";
        });

        return update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
})


// 
let raggingSubmitBtn = document.querySelector(".raggingSubmitBtn");
raggingSubmitBtn.addEventListener("click", function () {
  let raggingComplaintRaise = document.querySelector(".raggingComplaintRaise").value;
  let raggingComplaintDescription = document.querySelector(".raggingComplaintDescription").value;
  let raggingComplainDoneBy = document.querySelector(".raggingComplainDoneBy").value;

  if (raggingComplaintRaise != "" && raggingComplaintDescription != "" && raggingComplainDoneBy != "") {
    const db = getDatabase();

    const userUid = `${localStorage.getItem("logged_in_user")}`;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `students/${localStorage.getItem("logged_in_user")}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const oldComplain = snapshot.val().complaint;
        const newComplain = `${oldComplain} <div class="complain_body">
        <h4>${snapshot.val().firstName} ${snapshot.val().lastName}</h4>
        <h5>${raggingComplaintRaise}</h5>
        <p>${raggingComplaintDescription}</p>
        <span><button class="query" style="background-color:blue;">solve</button><button class="query" style="background-color: red;">reject</button></span>
        </div>`

        const updates = {};
        updates['/students/' + userUid + '/complaint/'] = newComplain;

        swal("Forwaeded!", "Your complaint is forwarded!")
        .then((value) => {
          document.querySelector(".messComplainRaise").value = "";
          document.querySelector(".messComplainDescription").value = "";
          document.querySelector(".messComplaintdoneBy").value = "";
        });

        return update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
})



// 
let hostelComplainSubmit = document.querySelector(".hostelComplainSubmit");
hostelComplainSubmit.addEventListener("click", function () {
  let hostelRaiseComplaint = document.querySelector(".hostelRaiseComplaint").value;
  let hostelDescriptionComplain = document.querySelector(".hostelDescriptionComplain").value;
  let hostelComplaintDoneby = document.querySelector(".hostelComplaintDoneby").value;

  if (hostelRaiseComplaint != "" && hostelDescriptionComplain != "" && hostelComplaintDoneby != "") {
    const db = getDatabase();

    const userUid = `${localStorage.getItem("logged_in_user")}`;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `students/${localStorage.getItem("logged_in_user")}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const oldComplain = snapshot.val().complaint;
        const newComplain = `${oldComplain} <div class="complain_body">
        <h4>${snapshot.val().firstName} ${snapshot.val().lastName}</h4>
        <h5>${hostelRaiseComplaint}</h5>
        <p>${hostelDescriptionComplain}</p>
        <span><button class="query" style="background-color:blue;">solve</button><button class="query" style="background-color: red;">reject</button></span>
        </div>`

        const updates = {};
        updates['/students/' + userUid + '/complaint/'] = newComplain;

        swal("Forwaeded!", "Your complaint is forwarded!")
        .then((value) => {
          document.querySelector(".messComplainRaise").value = "";
          document.querySelector(".messComplainDescription").value = "";
          document.querySelector(".messComplaintdoneBy").value = "";
        });

        return update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
})


// 
let otherComplainSubmitBtn = document.querySelector(".otherComplainSubmitBtn");
otherComplainSubmitBtn.addEventListener("click", function () {
  let otherComplaintRaise = document.querySelector(".otherComplaintRaise").value;
  let otherComplainDescription = document.querySelector(".otherComplainDescription").value;
  let otherComplainDoneby = document.querySelector(".otherComplainDoneby").value;

  if (otherComplaintRaise != "" && otherComplainDescription != "" && otherComplainDoneby != "") {
    const db = getDatabase();

    const userUid = `${localStorage.getItem("logged_in_user")}`;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `students/${localStorage.getItem("logged_in_user")}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const oldComplain = snapshot.val().complaint;
        const newComplain = `${oldComplain} <div class="complain_body">
        <h4>${snapshot.val().firstName} ${snapshot.val().lastName}</h4>
        <h5>${otherComplaintRaise}</h5>
        <p>${otherComplainDescription}</p>
        <span><button class="query" style="background-color:blue;">solve</button><button class="query" style="background-color: red;">reject</button></span>
        </div>`

        const updates = {};
        updates['/students/' + userUid + '/complaint/'] = newComplain;

        swal("Forwaeded!", "Your complaint is forwarded!")
        .then((value) => {
          document.querySelector(".messComplainRaise").value = "";
          document.querySelector(".messComplainDescription").value = "";
          document.querySelector(".messComplaintdoneBy").value = "";
        });

        return update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
})