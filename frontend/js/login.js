const loginForm =
document.getElementById("loginForm");

const message =
document.getElementById("message");

const API =
"http://localhost:5000/api";

loginForm.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const response =
await fetch(
`${API}/auth/login`,
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})
}
);

const data =
await response.json();

if(response.ok){

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"user",
JSON.stringify(data.user)
);

window.location.href =
"dashboard.html";

}else{

message.innerHTML =
`<div class="error">
${data.message}
</div>`;

}

}catch(error){

message.innerHTML =
`<div class="error">
Server Error
</div>`;

}

});