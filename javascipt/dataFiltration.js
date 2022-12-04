import {app} from './firebaseconfig.js';
import {getDatabase, ref, child, get} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


setTimeout(() => {
    

const dbRef = ref(getDatabase());
let hostel = ""
get(child(dbRef, `admins/${localStorage.getItem("logged_in_admin")}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    hostel = snapshot.val().hostelNameWarden
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, `students/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    for(let i in snapshot.val()){
      get(child(dbRef, `students/${i}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          if(snapshot.val().hostelName == hostel){
            console.log("yes")

            let complaintsBodyContent = document.querySelector(".complaintsBodyContent");
            complaintsBodyContent.innerHTML = `${snapshot.val().complaint}`;
            console.log(complaintsBodyContent);

            let studentsData = document.getElementById("studentsData");
            
            studentsData.innerHTML = studentsData.innerHTML +  `<td id="fullname">${snapshot.val().firstName + " " + snapshot.val().lastName}</td>
            <td id="enrollmentNo">${snapshot.val().semester}</td>
            <td id="contactNo">${snapshot.val().contactNo}</td>
            <td id="hostel">${snapshot.val().hostelName}</td>
            <td id="identity">${snapshot.val().identity}</td>
            <td id="status">${snapshot.val().status}</td>`
          }

         

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
    }
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

}, 7000);

let viewall = document.querySelector(".viewall");
let allComplaints = document.querySelector(".allComplaints");
viewall.addEventListener("click", function(){
    allComplaints.style.display = "flex";
})

let close = document.querySelector(".close");
close.addEventListener("click", function(){
    allComplaints.style.display = "none";
})
