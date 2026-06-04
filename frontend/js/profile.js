const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const API = "http://localhost:5000/api";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();

  window.location.href = "login.html";
});

async function loadProfile() {
  const response = await fetch(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await response.json();

  document.getElementById("username").value = user.username;

  document.getElementById("email").value = user.email;
}

loadProfile();

document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;

  const response = await fetch(`${API}/auth/update-profile`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      username,
    }),
  });

  if (response.ok) {
    alert("Profile Updated");
  }
});

document
  .getElementById("passwordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;

    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch(`${API}/auth/change-password`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        currentPassword,

        newPassword,
      }),
    });

    const data = await response.json();

    alert(data.message);
  });