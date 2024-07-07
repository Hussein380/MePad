document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    // Function to handle form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simulate login process (replace with actual backend integration)
        // Assuming successful login, redirect to appropriate page
        if (email === 'user@example.com' && password === 'password') {
            // Example: Redirect to consumer or cook page based on role
            window.location.href = 'consumer_home.html'; // Redirect to consumer home page
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    // Function to handle Google Sign-In button click
    const googleSigninButton = document.getElementById('google-signin-button');
    googleSigninButton.addEventListener('click', function () {
        // Redirect to Google OAuth consent screen
        const redirectUri = 'http://127.0.0.1:5500/my-web/herosection.html'; // Replace with your actual redirect URI
        const clientId = '335444001173-81n43ut62fss0ovclrgudotfj06sokt3.apps.googleusercontent.com'; // Replace with your Google OAuth client ID
        const scope = 'email profile'; // Scopes requested from Google

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;

        window.location.href = authUrl;
    });
});
