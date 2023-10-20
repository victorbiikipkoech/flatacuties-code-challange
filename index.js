// Define a variable to keep track of the total votes
let totalVotes = 0;

function fetchAndDisplayCharacters() {
  const url = 'http://localhost:3000/characters';

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Display the names, images, and vote buttons on the HTML page
      displayCharacterData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayCharacterData(characters) {
  const characterList = document.getElementById('character-list');
  const characterImage = document.getElementById('character-image-element');
  const totalVotesButton = document.getElementById('total-votes-button');
  const totalVotesCount = document.getElementById('total-votes-count');

  characterList.innerHTML = ''; // Clear previous content

  characters.forEach(character => {
    const listItem = document.createElement('li');
    
    // Create a element for the character name
    const nameSpan = document.createElement('span');
    nameSpan.textContent = character.name;

    // Attach a click event to the name to display the character image
    nameSpan.addEventListener('click', () => {
      displayCharacterImage(character.image);
    });

    // Create a vote button
    const voteButton = document.createElement('button');
    voteButton.textContent = 'Vote';
    voteButton.addEventListener('click', () => {
      // Increment the totalVotes variable and update the display
      totalVotes++;
      totalVotesCount.textContent = 'Total Votes: ' + totalVotes;
    });

    listItem.appendChild(nameSpan);
    listItem.appendChild(voteButton);
    characterList.appendChild(listItem);
  });

  // Event listener for the "Total Votes" button
  totalVotesButton.addEventListener('click', () => {
    totalVotesCount.textContent = 'Total Votes: ' + totalVotes;
  });
}

function displayCharacterImage(imageUrl) {
  const characterImage = document.getElementById('character-image-element');
  characterImage.src = imageUrl;
}



function resetVotes() {
  totalVotes = 0;
  const totalVotesCount = document.getElementById('total-votes-count');
  totalVotesCount.textContent = 'Total Votes: ' + totalVotes;
}

document.addEventListener('DOMContentLoaded', () => {
  const resetVotesButton = document.getElementById('reset-votes-button');
  resetVotesButton.addEventListener('click', resetVotes);

  // Call the function to fetch and display character data
  fetchAndDisplayCharacters();
});