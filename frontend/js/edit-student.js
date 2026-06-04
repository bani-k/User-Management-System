const token =
localStorage.getItem(
"token"
);

const API =
"http://localhost:5000/api";

const params =
new URLSearchParams(
window.location.search
);

const id =
params.get("id");

async function loadStudent(){

const response =
await fetch(
`${API}/students/${id}`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

const student =
await response.json();

document.getElementById(
"studentId"
).value =
student.studentId;

document.getElementById(
"firstName"
).value =
student.firstName;

document.getElementById(
"lastName"
).value =
student.lastName;

document.getElementById(
"email"
).value =
student.email;

document.getElementById(
"phone"
).value =
student.phone;

document.getElementById(
"course"
).value =
student.course;

document.getElementById(
"semester"
).value =
student.semester;

document.getElementById(
"address"
).value =
student.address;

}

loadStudent();

document
.getElementById("editForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const updated = {

studentId:
studentId.value,

firstName:
firstName.value,

lastName:
lastName.value,

email:
email.value,

phone:
phone.value,

course:
course.value,

semester:
semester.value,

address:
address.value

};

await fetch(
`${API}/students/${id}`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(
updated
)

}
);

alert(
"Student Updated"
);

window.location.href =
"students.html";

});