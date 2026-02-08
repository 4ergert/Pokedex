let preLoadCase = [];
let amountOfPokemons = 9

async function fetchDataJason() {
  for (let APIindex = 1; APIindex <= amountOfPokemons; APIindex++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${APIindex}`);
    let responseAsJson = await response.json();
    preLoadCase.push(responseAsJson)
  }

  for (let preLoadCaseIndex = 0; preLoadCaseIndex < preLoadCase.length; preLoadCaseIndex++) {
    document.getElementById('content').innerHTML += getCardTemplate(preLoadCaseIndex);
    if (preLoadCase[preLoadCaseIndex].types.length > 1) {
      document.getElementById(`types_${preLoadCaseIndex}`).innerHTML += `
        <p class="type_two">${preLoadCase[preLoadCaseIndex].types[1].type.name}</p>
      `
    }
  }
  
}

function getCardTemplate(index) {
  let pokemoName = preLoadCase[index].name.replace(/^./, char => char.toUpperCase());

  return ` 
    <section class="card bg_${preLoadCase[index].types[0].type.name}">
      <h1>${pokemoName}</h1>
      <img src="${preLoadCase[index].sprites.other.dream_world.front_default}" alt="">
      <div class="types" id="types_${index}">
        <p class="type_one">${preLoadCase[index].types[0].type.name}</p>
      </div>
    </section>
  `
}