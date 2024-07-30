document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const formData = new FormData(signupForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const role = formData.get('role');

        
        // Validate password match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Simulate signup process (replace with actual backend integration)
        // Assuming successful signup, redirect based on role
        if (role === 'consumer') {
            window.location.href = 'consumer_home.html'; // Redirect to consumer home page
        } else if (role === 'cook') {
            window.location.href = 'cook_profile_setup.html'; // Redirect to cook profile setup page
        } else {
            alert('Invalid role selected.'); // Handle any unexpected cases
        }
    });

    // Handle Google signup button click
    const googleSignupButton = document.querySelector('.gsi-material-button'); // Select by class
   
    googleSignupButton.addEventListener('click', function () {
        // Redirect to Google OAuth consent screen
       
        const redirectUri = 'http://127.0.0.1:5500/my-web/herosection.html';
        
        const clientId = '335444001173-qg8dbg02kif5ug4muad3qfr85pmivela.apps.googleusercontent.com'; //  Google OAuth client ID
        const scope = 'email profile'; // Scopes requested from Google

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;

        window.location.href = authUrl;
    });
});
