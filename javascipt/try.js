import { app } from './firebaseconfig.js';
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

// const hostelName = "";

const dbRef = ref(getDatabase());
get(child(dbRef, `admins/${localStorage.getItem("logged_in_admin")}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let current_user = {
      name: snapshot.val().name,
      birthday: snapshot.val().birthday,
      degree: snapshot.val().degree,
      age: snapshot.val().age,
      email: snapshot.val().email,
      // password: "",
      phoneNo: snapshot.val().phoneNo,
      address: snapshot.val().address,
      hostelNameWarden: snapshot.val().hostelNameWarden,
    }

    let name = document.getElementById("name");
    name.innerHTML = current_user.name;

    const hostelName = document.getElementById("hostelName");
    hostelName.innerHTML = `Warden of ${current_user.hostelNameWarden}`;

    let birthday = document.getElementById("birthday");
    birthday.innerHTML = current_user.birthday;

    let age = document.getElementById("age");
    age.innerHTML = current_user.age;

    let emailId = document.getElementById("emailId");
    emailId.innerHTML = current_user.email;

    let degree = document.getElementById("degree");
    degree.innerHTML = current_user.degree;

    let phoneNo = document.getElementById("phoneNo");
    phoneNo.innerHTML = current_user.phoneNo;

    let address = document.getElementById("address");
    address.innerHTML = current_user.address;

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


// collect data of all students




const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
  var theme = getCookie(themeCookieName)
  body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
  if (body.classList.contains(themeLight)) {
    body.classList.remove(themeLight)
    body.classList.add(themeDark)
    setCookie(themeCookieName, themeDark)
  } else {
    body.classList.remove(themeDark)
    body.classList.add(themeLight)
    setCookie(themeCookieName, themeLight)
  }
}

function collapseSidebar() {
  body.classList.toggle('sidebar-expand')
}

window.onclick = function (event) {
  openCloseDropdown(event)
}

function closeAllDropdown() {
  var dropdowns = document.getElementsByClassName('dropdown-expand')
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove('dropdown-expand')
  }
}

function openCloseDropdown(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    // 
    // Close dropdown when click out of dropdown menu
    // 
    closeAllDropdown()
  } else {
    var toggle = event.target.dataset.toggle
    var content = document.getElementById(toggle)
    if (content.classList.contains('dropdown-expand')) {
      closeAllDropdown()
    } else {
      closeAllDropdown()
      content.classList.add('dropdown-expand')
    }
  }
}

// var ctx = document.getElementById('myChart')
// ctx.height = 500;
// ctx.width = 500;
var data = {
  labels: ['January', 'February', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    fill: false,
    label: 'Completed',
    borderColor: successColor,
    data: [120, 115, 130, 100, 123, 88, 99, 66, 120, 52, 59],
    borderWidth: 2,
    lineTension: 0,
  }, {
    fill: false,
    label: 'Issues',
    borderColor: dangerColor,
    data: [66, 44, 12, 48, 99, 56, 78, 23, 100, 22, 47],
    borderWidth: 2,
    lineTension: 0,
  }]
}

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

