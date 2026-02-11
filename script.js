let preLoadCase = [];
let evoPreLoad;
let amountOfPokemons = 20;
let evoOne;
let evoTwo;
let evoThree;
let evoOneImg;
let evoTwoImg;
let evoThreeImg;
let isLastEvoThree = false;

async function fetchThenRender() {
  try {
    await fechtDataJSON();
    await getPromise();
    render();
  } catch (error) {
    console.error(error);
  }
};

async function fechtDataJSON() {
  for (let pokemonIndex = 1; pokemonIndex <= amountOfPokemons; pokemonIndex++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
    let responseAsJson = await response.json();
    preLoadCase.push(responseAsJson);
  };
};

async function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (preLoadCase.length != amountOfPokemons) {
        reject("it don't work");
      } else {
        resolve("it works");
      };
    }, 500);
  });
}

function render() {
  for (let preLoadCaseIndex = 0; preLoadCaseIndex < preLoadCase.length; preLoadCaseIndex++) {
    document.getElementById("content").innerHTML += getCardTemplate(preLoadCaseIndex);

    if (preLoadCase[preLoadCaseIndex].types.length > 1) {
      document.getElementById(`types_${preLoadCaseIndex}`).innerHTML += getTemplateSecType(preLoadCaseIndex);
    };
  };
};

function showDetailedPokemonCard(index) {
  const refPokemonCard = document.getElementById("detailedPokemonCard");

  refPokemonCard.showModal();
  refPokemonCard.innerHTML = getTemplateDetailedPokemon(index);
  renderAboutDetails(index);
  backdropClose(refPokemonCard);
}

// render about Details
function renderAboutDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "flex";
  refDetailSpace.style.height = "292px"
  refDetails.innerHTML = aboutDetails(index);
  renderAbilities(index)
}

function renderAbilities(index) {
  const refAbility = document.getElementById("ability");
  if (preLoadCase[index].abilities.length > 1) {
    for (let abilitiesIndex = 0; abilitiesIndex < preLoadCase[index].abilities.length; abilitiesIndex++) {
      refAbility.innerHTML += preLoadCase[index].abilities[abilitiesIndex].ability.name + '<br>';
    }
  }
}

// render base states details
function renderBaseStatesDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "flex";
  refDetailSpace.style.height = "292px"
  refDetails.innerHTML = baseStatesDetails(index);
}

// render evolution
async function renderEvolutionDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "none";
  refDetailSpace.style.height = "526px"

  refEvoURL = await fetchEvolution(index)
  getEvoImg(index)
  refDetails.innerHTML = evolutionDetails();
  let evoThreeDisplay = isLastEvoThree == true ? "flex" : "none";
  document.getElementById("evoThreeSpace").style.display = evoThreeDisplay;
}

let checkEvoThree;
function getEvoImg(index) {
  index += 1;
  let outputOne = preLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.species.name}`);
  evoOne = evoPreLoad.chain.species.name.replace(/^./, char => char.toUpperCase());
  for (let i = 0; i < outputOne.length; i++) evoOneImg = outputOne[i].sprites.other.dream_world.front_default;
  let outputTwo = preLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.evolves_to[0].species.name}`);
  evoTwo = evoPreLoad.chain.evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
  for (let i = 0; i < outputTwo.length; i++) evoTwoImg = outputTwo[i].sprites.other.dream_world.front_default;

  tryCatchEvoThree()
}

async function tryCatchEvoThree() {
  try {
    renderEvoThree()
    let outputThree = preLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.evolves_to[0].evolves_to[0].species.name}`);
    evoThree = evoPreLoad.chain.evolves_to[0].evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
    for (let i = 0; i < outputThree.length; i++) evoThreeImg = outputThree[i].sprites.other.dream_world.front_default;
    isLastEvoThree = true;
  } catch (error) {
    console.log('check');
    isLastEvoThree = false;
  }
}

async function renderEvoThree() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (evoPreLoad.chain.evolves_to[0].evolves_to.length == 0) {
        reject("it don't work");
      } else {
        resolve("it works");
      };
    }, 500);
  });
}

async function fetchEvolution(index) {
  let refEvoChainURL = await fetch(preLoadCase[index].species.url);
  let refUrlAsJSON = await refEvoChainURL.json();
  let refEvoURL = refUrlAsJSON.evolution_chain.url;

  let responseEvo = await fetch(`${refEvoURL}`);
  let responseEvoAsJson = await responseEvo.json();

  evoPreLoad = (responseEvoAsJson);
}

//close dialog
function closeDetailedPokemonCard() {
  let refPokemonCard = document.getElementById("detailedPokemonCard");
  refPokemonCard.close();
}

function backdropClose(dialog) {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}