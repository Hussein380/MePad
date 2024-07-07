// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const profilesContainer = document.querySelector('.profiles-container');

    // Example data (replace with actual fetched data)
    const cooksData = [
        {
            name: 'John Doe',
            bio: 'Passionate about creating delicious home-cooked meals!',
            image: 'john-doe.jpg',
            foodLink: 'johns-recipes.html' // Link to page with John's recipes
        },
        {
            name: 'Jane Smith',
            bio: 'Specializes in vegan and gluten-free dishes.',
            image: 'jane-smith.jpg',
            foodLink: 'janes-recipes.html' // Link to page with Jane's recipes
        }
        // Add more cook profiles as needed
    ];

    // Function to create profile cards
    function createProfileCard(cook) {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        profileCard.innerHTML = `
            <img src="${cook.image}" alt="${cook.name}">
            <h2>${cook.name}</h2>
            <p>${cook.bio}</p>
            <a href="${cook.foodLink}" target="_blank">Explore Food</a>
        `;

        profilesContainer.appendChild(profileCard);
    }

    // Display profiles
    cooksData.forEach(cook => {
        createProfileCard(cook);
    });
});
