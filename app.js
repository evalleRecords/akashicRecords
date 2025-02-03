// Handling form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission to server
  
    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Basic validation
    if (username === "" || password === "") {
      alert("Please fill out both fields.");
    } else {
      alert(`Welcome, ${username}!`);
      // Here you can add code to send data to the server (e.g., using fetch or AJAX)
    }
  });
  