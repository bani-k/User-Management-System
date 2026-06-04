const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const API = "http://localhost:5000/api";

let currentPage = 1;

let currentSearch = "";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "login.html";
});

async function loadStudents(page = 1, search = "") {
  try {
    const response = await fetch(
      `${API}/students?page=${page}&limit=5&search=${search}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    renderStudents(data.students);

    renderPagination(data.totalPages, page);
  } catch (err) {
    console.log(err);
  }
}

function renderStudents(students) {
  const table = document.getElementById("studentTable");

  table.innerHTML = "";

  students.forEach((student) => {
    table.innerHTML += `

<tr>

<td>
${student.studentId}
</td>

<td>
${student.firstName}
${student.lastName}
</td>

<td>
${student.course}
</td>

<td>
${student.semester}
</td>

<td>

<button
class="action-btn edit-btn"
onclick="
viewStudent(
'${student._id}'
)
">

View

</button>

<button
class="action-btn edit-btn"
onclick="
editStudent(
'${student._id}'
)
">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="
deleteStudent(
'${student._id}'
)
">

Delete

</button>

</td>

</tr>

`;
  });
}

function renderPagination(totalPages, current) {
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `

<button
onclick="
changePage(${i})
"
style="
margin:5px;
padding:8px;
">

${i}

</button>

`;
  }
}

function changePage(page) {
  currentPage = page;

  loadStudents(page, currentSearch);
}

function searchStudents() {
  currentSearch = document.getElementById("search").value;

  loadStudents(1, currentSearch);
}

async function deleteStudent(id) {
  const confirmDelete = confirm("Delete Student?");

  if (!confirmDelete) return;

  try {
    await fetch(
      `${API}/students/${id}`,

      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadStudents(currentPage, currentSearch);
  } catch (err) {
    console.log(err);
  }
}
function viewStudent(id) {
  window.location.href = `student-profile.html?id=${id}`;
}
function editStudent(id) {
  window.location.href = `edit-student.html?id=${id}`;
}
loadStudents();