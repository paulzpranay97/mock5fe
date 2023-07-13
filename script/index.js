const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginToggler = document.getElementById("login-toggle");
const signupToggler = document.getElementById("signup-toggle");

loginToggler.addEventListener("click", toggleForm);
signupToggler.addEventListener("click", toggleForm);

function toggleForm(e) {
  e.preventDefault();
  loginToggler.classList.toggle("active");
  signupToggler.classList.toggle("active");

  loginForm.style.display = loginToggler.classList.contains("active") ? 'block' : 'none';
  signupForm.style.display = signupToggler.classList.contains("active") ? 'block' : 'none';
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  // Check if the password and confirm password fields match
  if (pass !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Send a POST request to the /api/signup endpoint with the form data
  const data = { email, pass, confirmPassword };
  fetch("https://emp-4qx5.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Signup failed.");
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
      alert("Signup successful.");
      // Redirect to the login page after successful signup
      window.location.href = "./dashboard.html";
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  // Send a POST request to the /api/login endpoint with the form data
  const data = { email, pass };
  fetch("https://emp-4qx5.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Login failed.");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert("Login successful.");
      // Redirect to the dashboard page after successful login
      window.location.href = "./dashbord.html";
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
});