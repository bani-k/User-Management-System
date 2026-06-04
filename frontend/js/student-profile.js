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

async function loadProfile(){

try{

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

document
.getElementById(
"profile"
)
.innerHTML = `

<h3>
${student.firstName}
${student.lastName}
</h3>

<br>

<p>
<b>Student ID:</b>
${student.studentId}
</p>

<p>
<b>Email:</b>
${student.email}
</p>

<p>
<b>Phone:</b>
${student.phone}
</p>

<p>
<b>Course:</b>
${student.course}
</p>

<p>
<b>Semester:</b>
${student.semester}
</p>

<p>
<b>Address:</b>
${student.address}
</p>

<p>
<b>Created:</b>
${new Date(
student.createdAt
).toLocaleString()}
</p>

`;

}catch(err){

console.log(err);

}

}

loadProfile();