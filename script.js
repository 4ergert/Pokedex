let preLoadCase = [];
let amountOfPokemons = 30

async function fetchDataJason() {
  for (let APIindex = 1; APIindex <= amountOfPokemons; APIindex++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${APIindex}`);
    let responseAsJson = await response.json();
    preLoadCase.push(responseAsJson)
  }
  
  for (let preLoadCaseIndex = 0; preLoadCaseIndex < preLoadCase.length; preLoadCaseIndex++) {
    document.getElementById('content').innerHTML += getCardTemplate(preLoadCaseIndex);
  }

}

function getCardTemplate(index) {

  let name = preLoadCase[index].name.replace(/^./, char => char.toUpperCase());

  return ` 
    <section class="card">
      <h1>${name}</h1>
      <img src="${preLoadCase[index].sprites.other.dream_world.front_default}" alt="">
    </section>
  `
}