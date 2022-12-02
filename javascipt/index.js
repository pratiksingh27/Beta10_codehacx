console.log("This is index.js");

let student_login_type = document.querySelector(".student_login_type")
let admin_login_type = document.querySelector(".admin_login_type");

let student_login_form = document.querySelector(".student_login_form");
let admin_login_form = document.querySelector(".admin_login_form");

let check1 = true;
admin_login_type.addEventListener("click", function () {
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