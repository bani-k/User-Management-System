const token =
localStorage.getItem("token");

if(!token){
    window.location.href =
    "login.html";
}

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

    localStorage.clear();

    window.location.href =
    "login.html";

});

const API =
"http://localhost:5000/api";

async function loadStats(){

try{

const response =
await fetch(
`${API}/students/dashboard/stats`,
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data =
await response.json();

document
.getElementById("totalStudents")
.innerText =
data.totalStudents;

const statsDiv =
document
.getElementById("courseStats");

statsDiv.innerHTML = "";

data.courseStats.forEach(course=>{

statsDiv.innerHTML += `
<p>
${course._id}
:
${course.count}
Students
</p>
`;

});

}catch(err){

console.log(err);

}

}

loadStats();