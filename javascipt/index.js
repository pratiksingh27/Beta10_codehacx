console.log("This is index.js");

import { app, storageRef } from './firebaseconfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
const auth = getAuth();

import { getDatabase, ref, push, set, child, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
const database = getDatabase();

import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
const storage = getStorage(app);

let student_login_type = document.querySelector(".student_login_type")
let admin_login_type = document.querySelector(".admin_login_type");
let student_register_form = document.querySelector("#student_register_form");
let login_container = document.querySelector(".login_container");

let student_login_form = document.querySelector(".student_login_form");
let admin_login_form = document.querySelector(".admin_login_form");

let check1 = true;
admin_login_type.addEventListener("click", function () {
    student_register_form.style.transition = "all 0.5s";
    student_register_form.style.transform = "translateX(-2000%)";

    login_container.style.transition = "all 0.5s";
    login_container.style.transform = "translateX(0px)";

    if (check1) {
        student_login_form.style.transition = "all 0.5s";
        student_login_form.style.transform = "rotateY(180deg)";

        admin_login_form.style.display = "inline";
        admin_login_form.style.transition = "all 0.5s";
        admin_login_form.style.transform = "rotateY(360deg)";

        setTimeout(() => {
            student_login_form.style.display = "none";
        }, 300);
        check1 = false;
    }
})

student_login_type.addEventListener("click", function () {
    student_register_form.style.transition = "all 0.5s";
    student_register_form.style.transform = "translateX(-2000%)";

    login_container.style.transition = "all 0.5s";
    login_container.style.transform = "translateX(0px)";

    if (!check1) {
        admin_login_form.style.transition = "all 0.5s";
        admin_login_form.style.transform = "rotateY(180deg)";

        student_login_form.style.display = "inline";
        student_login_form.style.transition = "all 0.5s";
        student_login_form.style.transform = "rotateY(360deg)";

        setTimeout(() => {
            admin_login_form.style.display = "none";
        }, 300);
        check1 = true;
    }
})

let student_signup_link = document.querySelector(".student_signup_link a");


student_signup_link.addEventListener("click", function () {
    login_container.style.transition = "all 0.5s";
    login_container.style.transform = "translateX(2000px)";

    // admin_login_form.style.transition = "all 0.5s";
    // admin_login_form.style.transform = "translateX(2000px)";

    student_register_form.style.transition = "all 0.5s";
    student_register_form.style.transform = "translateX(0px)";
})


let preloader1 = document.querySelector(".preloader1");
let register_btn = document.querySelector("#register_btn");

register_btn.addEventListener("click", function () {

    let firstName = document.querySelector("#firstName").children[0].value;
    let check1 = false;
    if (firstName == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #firstName::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check1 = true;
    }

    document.getElementById("firstName").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #firstName::after{
               content: "";
              }
             </style>
          `);
    })

    let lastName = document.getElementById("lastName").children[0].value;
    // console.log(lastName);

    let check2 = false;

    if (lastName == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #lastName::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check2 = true;
    }

    document.getElementById("lastName").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #lastName::after{
               content: "";
              }
             </style>
          `);
    })


    let emailId = document.getElementById("emailId").children[0].value;
    // console.log(emailId);

    let check3 = false;

    if (emailId == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #emailId::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else if (!emailId.includes("@gmail.com")) {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #emailId::after{
               content: "*invalid email ID";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check3 = true;
    }

    document.getElementById("emailId").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #emailId::after{
               content: "";
              }
             </style>
          `);
    })


    let semester = document.getElementById("semester").children[0].value;
    // console.log(semester);

    let check4 = false;

    if (semester == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #semester::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check4 = true;
    }

    document.getElementById("semester").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #semester::after{
               content: "";
              }
             </style>
          `);
    })


    let branch = document.getElementById("branch").children[0].value;
    // console.log(branch);

    let check5 = false;

    if (branch == 'Select Branch') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #branch{
                position: relative;
              }
    
              #branch::after{
               content: "*Branch is not selected";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check5 = true;
    }

    document.getElementById("branch").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #branch::after{
               content: "";
              }
             </style>
          `);
    })


    let graduationYear = document.getElementById("year_of_graduation").children[0].value;
    // console.log(branch);

    let check6 = false;
    if (graduationYear == 'Select Graduation Year') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #year_of_graduation{
                position: relative;
              }
    
              #year_of_graduation::after{
               content: "*Graduation year is not selected";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check6 = true;
    }

    document.getElementById("year_of_graduation").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #year_of_graduation::after{
               content: "";
              }
             </style>
          `);
    })

    let contactNo = document.getElementById("contactNo").children[0].value;
    // console.log(contactNo);

    let check7 = false;

    if (contactNo == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #contactNo::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else if (contactNo.length != 10) {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #contactNo::after{
                 content : "*invalid phoneNo";
                 color: red;
                 font-size: 12px;
                 position: absolute;
                 left: 12px;
                 top: 45px;
              }
            </style>
            `);
    }
    else {
        check7 = true;
    }

    document.getElementById("contactNo").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #contactNo::after{
               content: "";
              }
             </style>
          `);
    })


    let University_College = document.getElementById("University_College").children[0].value;
    // console.log(University_College);

    let check8 = false;

    if (University_College == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #University_College::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check8 = true;
    }

    document.getElementById("University_College").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #University_College::after{
               content: "";
              }
             </style>
          `);
    })


    let password = document.getElementById("password").children[0].value;
    // console.log(University_College);

    let check9 = false;

    if (password == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #password::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check9 = true;
    }

    document.getElementById("password").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #password::after{
               content: "";
              }
             </style>
          `);
    })


    let hostelName = document.getElementById("hostelName").children[0].value;
    // console.log(University_College);

    let check10 = false;

    if (hostelName == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #hostelName::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check10 = true;
    }

    document.getElementById("hostelName").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #hostelName::after{
               content: "";
              }
             </style>
          `);
    })


    let roomNo = document.getElementById("roomNo").children[0].value;
    let check11 = false;
    if (roomNo == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #roomNo::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check11 = true;
    }

    document.getElementById("roomNo").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #roomNo::after{
               content: "";
              }
             </style>
          `);
    })

    let address = document.getElementById("address").children[0].value;

    let parentsNo = document.getElementById("parentsNo").children[0].value;
    console.log(parentsNo);
    let check12 = false;
    if (parentsNo == '') {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #parentsNo::after{
               content: "*required field";
               color: red;
               font-size: 12px;
               position: absolute;
               left: 12px;
               top: 45px;
              }
             </style>
          `);
    }
    else {
        check12 = true;
    }

    document.getElementById("parentsNo").addEventListener("click", () => {
        document.head.insertAdjacentHTML("beforeend", `
            <style>
              #parentsNo::after{
               content: "";
              }
             </style>
          `);
    })

    if (check1 == true && check2 == true && check3 == true && check4 == true && check5 == true && check6 == true && check7 == true && check8 == true && check9 == true && check10 == true && check11 == true && check12 == true) {

        preloader1.style.display = "flex";
        signUp(emailId, password, firstName, lastName, branch, University_College, contactNo, semester, graduationYear, roomNo, hostelName, address, parentsNo);
    }
})

function signUp(email, password, firstName, lastName, branch, University_College, contactNo, semester, graduationYear, roomNo, hostelName, address, parentsNo) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            const db = getDatabase();
            const studentListsRef = ref(db, 'students');
            const newStudentListRef = push(studentListsRef);
            set(newStudentListRef, {
                complaint: "",
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                branch: branch,
                University_College: University_College,
                contactNo: contactNo,
                semester: semester,
                graduationYear: graduationYear,
                roomNo: roomNo,
                hostelName: hostelName,
                photoUrl: "",
                address: address,
                parentsNo: parentsNo,
                identity: "",
                status: "",
                responseMessage: "",

            });

            preloader1.style.display = "none";

            swal("Good job!", "Your account is successfully created!", "success")
                .then((value) => {
                    student_register_form.style.transition = "all 0.5s";
                    student_register_form.style.transform = "translateX(-2000%)";

                    login_container.style.transition = "all 0.5s";
                    login_container.style.transform = "translateX(0px)";

                    // if (!check1) {
                    admin_login_form.style.transition = "all 0.5s";
                    admin_login_form.style.transform = "rotateY(180deg)";

                    student_login_form.style.display = "inline";
                    student_login_form.style.transition = "all 0.5s";
                    student_login_form.style.transform = "rotateY(360deg)";

                    setTimeout(() => {
                        admin_login_form.style.display = "none";
                    }, 300);
                    check1 = true;
                    // }
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            preloader1.style.display = "none";
            swal("Retry!", `${errorMessage}`, "error");
            // ..
        });
}


// student login
let preloader2 = document.querySelector(".preloader2");
let student_login_btn = document.querySelector(".student_login_btn");
student_login_btn.addEventListener("click", function (event) {
    event.preventDefault();
    preloader2.style.display = "flex";
    let student_email = document.querySelector("#student_email").value;
    let student_password = document.querySelector("#student_password").value;

    if (student_email == "admin1@gmail.com" || student_email == "admin2@gmail.com" || student_email == "admin3@gmail.com" || student_email == "admin4@gmail.com") {
        swal("Retry!", "Your emailId or Password must be wrong!", "wrong")
            .then((value) => {
                preloader2.style.display = "none";
                document.addEventListener("#admin_email").value = "";
                document.addEventListener("#Identity_Key").value = "";
            });

    }
    else {
        loginUp(student_email, student_password);
    }

})

function loginUp(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            setTimeout(() => {
                getUid(email);
            }, 2000);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            preloader2.style.display = "none";
            swal("Retry!", `${errorMessage}`, "error");
        });
}

function getUid(emailId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `students`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            for (let i in snapshot.val()) {
                console.log(i);

                const dbRef = ref(getDatabase());
                get(child(dbRef, `students/${i}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val().email);
                        if (emailId == snapshot.val().email) {
                            console.log("hello");
                            localStorage.setItem("logged_in_user", `${i}`);
                            swal("Good job!", "You are successfully login!", "success")
                                .then((value) => {
                                    preloader2.style.display = "none";
                                    document.location.href = "dashboard.html";
                                });
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
}



// For Admin Login
let admin_login_btn = document.querySelector(".admin_login_btn");
admin_login_btn.addEventListener("click", function (event) {
    let admin_email = document.querySelector("#admin_email").value;
    let adminKey = document.querySelector("#Identity_Key").value;
    event.preventDefault();

    preloader2.style.display = "flex";
    if (admin_email == "admin1@gmail.com" || admin_email == "admin2@gmail.com" || admin_email == "admin3@gmail.com" || admin_email == "admin4@gmail.com") {
        adminLogin(admin_email, adminKey);
    }
    else {
        swal("Retry!", "Your emailId or Password must be wrong!", "wrong")
            .then((value) => {
                preloader2.style.display = "none";
                document.addEventListener("#admin_email").value = "";
                document.addEventListener("#Identity_Key").value = "";
            });
    }
})

function adminLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // let hostelName = "";
            // if (email == "admin1@gmail.com") {
            //     hostelName = "Hostel1";
            // }
            // else if (email == "admin2@gmail.com") {
            //     hostelName = "Hostel2";
            // }
            // else if (email == "admin3@gmail.com") {
            //     hostelName = "Hostel3"
            // }
            // else if (email == "admin4@gmail.com") {
            //     hostelName = "Hostel4";
            // }

            // const user = userCredential.user;
            // const db = getDatabase();
            // const adminPsotsRef = ref(db, 'admins');
            // const newadminPsotsRef = push(adminPsotsRef);
            // set(newadminPsotsRef, {
            //     name: "",
            //     birthday: "",
            //     degree: "",
            //     age: "",
            //     email: email,
            //     password: password,
            //     phoneNo: "",
            //     address: "",
            //     hostelNameWarden: hostelName,
            // });

            setTimeout(() => {


                const dbRef = ref(getDatabase());
                get(child(dbRef, `admins/`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        for (let i in snapshot.val()) {
                            const dbRef = ref(getDatabase());
                            get(child(dbRef, `admins/${i}`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                    if (email == snapshot.val().email) {
                                        localStorage.setItem("logged_in_admin", `${i}`);
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

                swal("Great!", "Your are successfully login as a Admin!", "success")
                    .then((value) => {
                        preloader2.style.display = "none";
                        document.location.href = "admindashboard.html"
                    });
            }, 2000);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            preloader2.style.display = "none";
            swal("Retry!", `${errorMessage}`, "error");
        });
}