// index.js
function fetchCharactersAndDisplay() {
  const url = 'http://localhost:3000/characters';

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const characterList = document.getElementById('character-list');

          // Clear any existing content
          characterList.innerHTML = '';

          // Create a reset button to reset all votes
          const resetButton = document.createElement('button');
          resetButton.textContent = 'Reset Votes';
          resetButton.className = 'reset-button';

          const charactersData = [];

          resetButton.addEventListener('click', () => {
              charactersData.forEach(character => {
                  character.voteCount = 0;
                  const voteCountElement = character.liElement.querySelector('.vote-count');
                  voteCountElement.textContent = `Votes: ${character.voteCount}`;
              });
          });

          characterList.appendChild(resetButton);

          // Loop through the characters and add their names, vote buttons, vote counts, and images to the webpage
          data.forEach(character => {
              const characterName = document.createElement('li');
              characterName.textContent = character.name;

              const voteButton = document.createElement('button');
              voteButton.textContent = 'Vote';
              voteButton.className = 'vote-button';

              let voteCount = 0;
              const voteCountElement = document.createElement('span');
              voteCountElement.className = 'vote-count';
              voteCountElement.textContent = `Votes: ${voteCount}`;

              characterName.appendChild(voteButton);
              characterName.appendChild(voteCountElement);

              voteButton.addEventListener('click', () => {
                  voteCount++;
                  voteCountElement.textContent = `Votes: ${voteCount}`;
              });

              characterName.addEventListener('click', () => {
                  // Display the character's image when the name is clicked
                  displayCharacterImage(character.image);
              });

              charactersData.push({
                  name: character.name,
                  image: character.image,
                  voteCount: 0,
                  liElement: characterName
              });

              characterList.appendChild(characterName);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function displayCharacterImage(imageUrl) {
  const characterImage = document.getElementById('character-image');
  characterImage.innerHTML = ''; // Clear any existing content
  const img = document.createElement('img');
  img.src = imageUrl;
  characterImage.appendChild(img);
}

// Call the function to fetch and display character names when the page loads
fetchCharactersAndDisplay();
