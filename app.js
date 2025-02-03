document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Example login check
        if (username === 'user' && password === 'pass') {
            // Redirect to notes.html after successful login
            window.location.href = 'notes.html'; // Change to your notes page URL
        } else {
            alert('Invalid credentials, please try again.');
        }
    });
});
