const token =
localStorage.getItem("token");

if(!token){
window.location.href =
"login.html";
}

const API =
"http://localhost:5000/api";

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

localStorage.clear();

window.location.href =
"login.html";

});

document
.getElementById("studentForm")
.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const student = {

studentId:
document.getElementById(
"studentId"
).value,

firstName:
document.getElementById(
"firstName"
).value,

lastName:
document.getElementById(
"lastName"
).value,

email:
document.getElementById(
"email"
).value,

phone:
document.getElementById(
"phone"
).value,

course:
document.getElementById(
"course"
).value,

semester:
document.getElementById(
"semester"
).value,

address:
document.getElementById(
"address"
).value

};

await fetch(
`${API}/students`,
{
method:"POST",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify(student)

}
);

alert(
"Student Added"
);

window.location.href =
"students.html";

});