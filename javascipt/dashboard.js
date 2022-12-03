// Aside menu

import { app, storageRef } from './firebaseconfig.js';
import { getDatabase, ref, push, child, get, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
const storage = getStorage(app);


let current_user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branch: "",
    University_College: "",
    contactNo: "",
    semester: "",
    graduationYear: "",
    roomNo: "",
    hostelName: "",
    photoUrl: "",
    address: "",
    parentsNo: "",
    complaint: "",
    identity: "",
    status: "",
}

setTimeout(() => {
    fetchData();
}, 5000);


const dbRef = ref(getDatabase());
get(child(dbRef, `students/${localStorage.getItem("logged_in_user")}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        current_user.firstName = snapshot.val().firstName;
        console.log(snapshot.val().firstName)
        current_user.lastName = snapshot.val().lastName;
        current_user.email = snapshot.val().email;
        current_user.branch = snapshot.val().branch;
        current_user.contactNo = snapshot.val().contactNo;
        current_user.graduationYear = snapshot.val().graduationYear;
        current_user.hostelName = snapshot.val().hostelName;
        current_user.roomNo = snapshot.val().roomNo;
        current_user.semester = snapshot.val().semester;
        current_user.address = snapshot.val().address;
        current_user.parentsNo = snapshot.val().parentsNo;
        current_user.identity = snapshot.val().identity;
        current_user.University_College = snapshot.val().University_College;

        if (snapshot.val().photoUrl != '') {
            current_user.photoUrl = snapshot.val().photoUrl;
        }

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        for (let j = 0; j < totalNavList; j++) {
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        if (window.innerWidth < 1200) {
            asideSectionToggleBtn();
        }
    })
}

function fetchData() {
    let fullName = document.querySelector('#fullName');
    let branch = document.querySelector("#branch");
    let semester = document.querySelector("#semester");
    let hostelName = document.querySelector("#hostelName");
    let university = document.querySelector("#university");


    fullName.value = current_user.firstName + " " + current_user.lastName;
    fullName.readOnly = "true";
    branch.value = current_user.branch;
    branch.readOnly = "true";
    semester.value = current_user.semester;
    semester.readOnly = "true";
    hostelName.value = current_user.hostelName;
    hostelName.readOnly = "true";
    university.value = current_user.University_College;
    university.readOnly = "true";

    let contactNo = document.querySelector("#contactNo");
    let address = document.querySelector("#address");
    let emailId = document.querySelector("#emailId");
    let parentsNo = document.querySelector("#parentsNo");

    contactNo.value = current_user.contactNo;
    contactNo.readOnly = "true";
    address.value = current_user.address;
    address.readOnly = "true";
    emailId.value = current_user.email;
    emailId.readOnly = "true";
    parentsNo.value = current_user.parentsNo;
    parentsNo.readOnly = "true";

    if (current_user.identity != "" && current_user.status != "verified") {
        let take_identity = document.querySelector("#take_identity");
        take_identity.style.display = "none";

        let check_verification = document.querySelector("#check_verification");
        check_verification.style.display = "none";

        let processing = document.querySelector("#processing");
        processing.style.display = "flex";
    }
    else if (current_user.identity != "" && current_user.status == "rejected") {
        let take_identity = document.querySelector("#take_identity");
        take_identity.style.display = "none";

        let check_verification = document.querySelector("#check_verification");
        check_verification.style.display = "none";

        let rejected = document.querySelector("#rejected");
        rejected.style.display = "flex";
    }
    else if (current_user.identity != "" && current_user.status == "verified") {
        let take_identity = document.querySelector("#take_identity");
        take_identity.style.display = "none";

        let check_verification = document.querySelector("#check_verification");
        check_verification.style.display = "none";

        let verified = document.querySelector("#verified");
        verified.style.display = "flex";
    }


    let studentImage = document.querySelector("#studentImage");
    studentImage.src = `${current_user.photoUrl}`;


    // let preloader1 = document.querySelector(".preloader1");
    // preloader1.style.display = "none";
}

// update active class in nav bar
function updateNav(element) {
    // console.log(element.getAttribute("href").split("#")[1])
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

//  animation of aside menu
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

let upload = document.querySelector("#upload");
upload.addEventListener("change", function (event) {
    let preloader2 = document.querySelector(".preloader2");
    preloader2.style.display = "flex";

    console.log(event.target.files[0]);

    const spaceRef = storageRef(storage, `${localStorage.getItem("logged_in_user")}/profilePhoto/`);

    uploadBytes(spaceRef, event.target.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    const uploadTask = uploadBytesResumable(spaceRef, event.target.files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if (progress == '100') {
                alert("uploaded");
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                let studentImage = document.querySelector("#studentImage");
                studentImage.src = `${downloadURL}`;

                const db = getDatabase();
                const newPostKey = `${localStorage.getItem("logged_in_user")}`;
                const updates = {};
                updates['/students/' + newPostKey + "/photoUrl"] = downloadURL;
                // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

                let preloader2 = document.querySelector(".preloader2");
                preloader2.style.display = "none";

                return update(ref(db), updates);
            });
        }
    );
})

let take_identity = document.getElementById("take_identity");
take_identity.addEventListener("change", function (e) {
    console.log(e.target.files[0]);
    let preloader2 = document.querySelector(".preloader2");
    preloader2.style.display = "flex";

    const spaceRef = storageRef(storage, `${localStorage.getItem("logged_in_user")}/identity_proof/`);

    uploadBytes(spaceRef, e.target.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    const uploadTask = uploadBytesResumable(spaceRef, e.target.files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if (progress == '100') {
                alert("identity uploaded");
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                const db = getDatabase();
                const newPostKey = `${localStorage.getItem("logged_in_user")}`;
                const updates = {};
                updates['/students/' + newPostKey + "/identity"] = downloadURL;

                let preloader2 = document.querySelector(".preloader2");
                preloader2.style.display = "none";
                // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

                let check_verification = document.querySelector("#check_verification");
                check_verification.style.display = "none";

                let processing = document.querySelector("#processing");
                processing.style.display = "flex";

                return update(ref(db), updates);
            });
        }
    );
})


let edit = document.querySelector(".edit");
edit.addEventListener("click", function () {
    let fullName = document.querySelector("#fullName");
    fullName.readOnly = false;
    fullName.style.borderBottom = "2px solid #302e4d"

    let university = document.querySelector("#university");
    university.readOnly = false;
    university.style.borderBottom = "2px solid #302e4d"

    let contactNo = document.querySelector("#contactNo");
    contactNo.readOnly = false;
    contactNo.style.borderBottom = "2px solid #302e4d"

    let address = document.querySelector("#address");
    address.readOnly = false;
    address.style.borderBottom = "2px solid #302e4d"

    let parentsNo = document.querySelector("#parentsNo");
    parentsNo.readOnly = false;
    parentsNo.style.borderBottom = "2px solid #302e4d"

    let branch = document.querySelector("#branch");
    branch.readOnly = false;
    branch.style.borderBottom = "2px solid #302e4d";

    let update = document.querySelector(".update");
    update.style.display = "inline";
})

let update_details = document.querySelector(".update");
update_details.addEventListener("click", function () {
    let preloader3 = document.querySelector(".preloader3");
    preloader3.style.display = "flex";

    const db = getDatabase();
    // Get a key for a new Post.
    const newPostKey = `${localStorage.getItem("logged_in_user")}`;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/students/' + newPostKey + '/firstName'] = document.querySelector("#fullName").value;
    updates['/students/' + newPostKey + '/lastName'] = "";
    updates['/students/' + newPostKey + '/University_College'] = document.querySelector("#university").value;
    updates['/students/' + newPostKey + '/contactNo'] = document.querySelector("#contactNo").value;
    updates['/students/' + newPostKey + '/address'] = document.querySelector("#address").value;
    updates['/students/' + newPostKey + '/branch'] = document.querySelector("#branch").value;
    updates['/students/' + newPostKey + '/parentsNo'] = document.querySelector("#parentsNo").value;

    setTimeout(() => {
        preloader3.style.display = "none";
        document.location.href = "dashboard.html";
    }, 2000);
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return update(ref(db), updates);
})