document.addEventListener('DOMContentLoaded', () => {
    let totalVotes = 0; // To track total votes
    let currentCharacterImage = null; // To track the currently displayed image

    // Make a GET request to the JSON file
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Assuming the data structure provided
            const characters = data.characters;

            // Display character names, images, vote buttons, reset button, and input for image URL
            const characterList = document.getElementById('character-list'); // HTML element to display data
            characterList.innerHTML = ''; // Clear any existing content

            // Create an input for image URL
            const imageUrlInput = document.createElement('input');
            imageUrlInput.placeholder = 'Enter Image URL';
            imageUrlInput.addEventListener('change', () => {
                if (currentCharacterImage) {
                    currentCharacterImage.src = imageUrlInput.value;
                }
            });
            characterList.appendChild(imageUrlInput);

            // Create a button to reset votes
            const resetButton = document.createElement('button');
            resetButton.textContent = 'Reset Votes';
            resetButton.addEventListener('click', () => {
                totalVotes = 0;
                updateTotalVotes();
            });
            characterList.appendChild(resetButton);

            characters.forEach(character => {
                // Create a container for each character
                const characterContainer = document.createElement('div');
                characterContainer.className = 'character-container';

                // Create a span for the character name
                const characterName = document.createElement('span');
                characterName.textContent = character.name;

                // Create an image for the character
                const characterImage = document.createElement('img');
                characterImage.src = character.image;
                characterImage.alt = character.name;
                characterImage.style.display = 'none'; // Initially hide the image
                currentCharacterImage = characterImage; // Set the current image

                // Create a button to vote for the character
                const voteButton = document.createElement('button');
                voteButton.textContent = 'Vote';
                voteButton.addEventListener('click', () => {
                    character.votes += 1; // Increment character's votes
                    totalVotes += 1; // Increment total votes
                    updateTotalVotes();
                });

                // Add click event listener to show/hide the image
                characterName.addEventListener('click', () => {
                    if (currentCharacterImage) {
                        currentCharacterImage.style.display = 'none'; // Hide the previously displayed image
                    }
                    characterImage.style.display = 'block'; // Show the current character's image
                    currentCharacterImage = characterImage; // Set the current image as the displayed image
                });

                // Append name, image, vote button to the container
                characterContainer.appendChild(characterName);
                characterContainer.appendChild(characterImage);
                characterContainer.appendChild(voteButton);

                // Append the container to the character list
                characterList.appendChild(characterContainer);
            });

            // Function to update and display total votes
            function updateTotalVotes() {
                totalVotesDisplay.textContent = `Total Votes: ${totalVotes}`;
            }

            // Display total votes
            const totalVotesDisplay = document.createElement('p');
            totalVotesDisplay.textContent = `Total Votes: ${totalVotes}`;
            characterList.appendChild(totalVotesDisplay);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
