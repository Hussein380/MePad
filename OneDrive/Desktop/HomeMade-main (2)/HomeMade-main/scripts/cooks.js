document.addEventListener('DOMContentLoaded', function() {
    const profilesContainer = document.querySelector('.profiles-container');

    // Example data (replace with actual fetched data)
    const cooksData = [
        {
            name: 'Johny Doe',
            bio: 'Passionate about creating delicious home-cooked meals!',
            image: 'johny.jpg',
            specialties: 'Kenyan Cuisine',
            location: '<3km',
            contactEmail: 'john.doe@example.com',
            menu: [
                { dish: 'Spaghetti Carbonara', description: 'Classic Kenyan pasta dish with eggs, cheese, and pancetta.', price: '$15' },
                { dish: 'Margherita Pizza', description: 'Traditional Italian pizza with tomato, mozzarella, and basil.', price: '$12' }
            ],
            reviews: [
                { user: 'Alice', comment: 'John\'s pasta is incredible!', rating: 5 },
                { user: 'Bob', comment: 'Great pizza, authentic taste.', rating: 4.5 }
            ],
            foodLink: 'johns-recipes.html' // Link to page with John's recipes
        },
        {
            name: 'Jane Smith',
            bio: 'Specializes in vegan and gluten-free dishes.',
            image: 'jane.jpg',
            specialties: 'Vegan and Gluten-Free',
            location: ' <7km',
            contactEmail: 'jane.smith@example.com',
            menu: [
                { dish: 'Vegan Pad Nairobi', description: 'Traditional kenyan dish with eggs, peanuts, and rice noodles.', price: 'kes 1800' },
                { dish: 'Gluten-Free Chocolate Cake', description: 'Decadent chocolate cake made without gluten.', price: 'kes 1000' }
            ],
            reviews: [
                { user: 'Carol', comment: 'Jane\'s Pad Thai is amazing!', rating: 4.8 },
                { user: 'David', comment: 'Delicious cake, couldn\'t tell it was gluten-free.', rating: 4.7 }
            ],
            foodLink: 'janes-recipes.html' // Link to page with Jane's recipes
        }
        // Add more cook profiles as needed
    ];

    // Function to create profile cards
    function createProfileCard(cook) {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');

        // Construct the profile card HTML
        profileCard.innerHTML = `
            <img src="./assets/${cook.image}" alt="${cook.name}">
            <h2>${cook.name}</h2>
            <p>${cook.bio}</p>
            <div class="chef-details">
                <p><strong>Specialties:</strong> ${cook.specialties}</p>
                <p><strong>Location:</strong> ${cook.location}</p>
                <p><strong>Contact:</strong> <a href="mailto:${cook.contactEmail}">${cook.contactEmail}</a></p>
            </div>
            <div class="menu">
                <h3>Sample Menu</h3>
                <ul>
                    ${cook.menu.map(item => `
                        <li>
                            <h4>${item.dish}</h4>
                            <p>${item.description}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="reviews">
                <h3>Reviews</h3>
                <ul>
                    ${cook.reviews.map(review => `
                        <li>
                            <blockquote>${review.comment}</blockquote>
                            <p><strong>Rating:</strong> ${review.rating}</p>
                            <p><em>- ${review.user}</em></p>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <a href="${cook.foodLink}" target="_blank">Explore Food</a>
            <button class="see-more-btn">See More</button>
            <button class="contact-btn" style="display:none;">Contact Chef</button>
        `;

        profilesContainer.appendChild(profileCard);

        // Add functionality to the see more button
        const seeMoreBtn = profileCard.querySelector('.see-more-btn');
        seeMoreBtn.addEventListener('click', function() {
            profileCard.classList.toggle('expanded');
            seeMoreBtn.textContent = profileCard.classList.contains('expanded') ? 'See Less' : 'See More';
            profileCard.querySelector('.contact-btn').style.display = profileCard.classList.contains('expanded') ? 'inline-block' : 'none';
        });

        // Add functionality to the contact button
        const contactBtn = profileCard.querySelector('.contact-btn');
        contactBtn.addEventListener('click', function() {
            // Implement contact or booking form functionality here
            alert(`Contact form for ${cook.name} would go here!`);
        });
    }

    // Display profiles
    cooksData.forEach(cook => {
        createProfileCard(cook);
    });
});

