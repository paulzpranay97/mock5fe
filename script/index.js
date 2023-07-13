const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginToggle = document.getElementById('login-toggle');
const signupToggle = document.getElementById('signup-toggle');

loginToggle.addEventListener('click', toggleForm);
signupToggle.addEventListener('click', toggleForm);

function toggleForm(event) {
  event.preventDefault();

  loginToggle.classList.toggle('active');
  signupToggle.classList.toggle('active');

  loginForm.style.display = loginToggle.classList.contains('active') ? 'block' : 'none';
  signupForm.style.display = signupToggle.classList.contains('active') ? 'block' : 'none';
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  login(email, pass);
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get form data
  const email = document.getElementById('signup-email').value;
  const pass= document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  signup(email, pass, confirmPassword);
});

function login(email, pass) {
  fetch('https://emp-4qx5.onrender.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pass }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        localStorage.setItem('token', data.token);
        alert('Login Successful');
        window.location.href = '/dashboard';
      } else {
        alert('Invalid Credentials');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error occurred during login');
    });
}

function signup(email, pass, confirmPassword) {
  fetch('https://emp-4qx5.onrender.com/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pass, confirmPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Signup request failed');
      }
      return response.json();
    })
    .then((data) => {
      if (data.ok) {
        alert('Signup Successful');
        signupForm.reset();
        toggleForm({ target: loginToggle });
      } else {
        throw new Error(data.error);
      }
    })
    .catch((error) => {
    
        console.log(error);
        alert('Error occurred during signup');
     
    });
}