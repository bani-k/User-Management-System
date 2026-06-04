const registerForm =
document.getElementById("registerForm");

const message =
document.getElementById("message");

const API =
"http://localhost:5000/api";

registerForm.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const username =
document.getElementById("username").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const response =
await fetch(
`${API}/auth/register`,
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
email,
password
})
}
);

const data =
await response.json();

if(response.ok){

message.innerHTML =
`<div class="success">
Registration Successful
</div>`;

setTimeout(()=>{

window.location.href =
"login.html";

},1000);

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