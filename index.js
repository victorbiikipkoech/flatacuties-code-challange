 function getCharacters(){
  fetch("http://localhost:3000/characters", {
      method:"GET",
      headers:{
        "content-Type":application/json"
      }function
  }).then(data => db.json())
  .then( response => {
      Characters = [...response]
      displayCharacters(response)
  })
  function displayCharacters(characters) {
      const characterbar = document.querySelector("#character-bar")
      for( character of response){
          console.log(character.name)
          const.span = document.createElement("span");
          span.innerText = character.name;
          span.setAttribute("id",character.id)
  
          span.addEventListener("click" (Event))=>{
              alert(Event.target.innerText)
          })
          characterbar.appendChild(span);
      }
  } 
function getCharactersById(characters,id){
    return characters.find((character)=>{
        return character.id === id
    })
}