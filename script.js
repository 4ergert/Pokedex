let preLoadCase = [];
let evoPreLoad;
let amountOfPokemons = 9;

async function fetchThenRender() {
  try {
    await fechtDataJSON();
    await getPromise();
    render();
  } catch (error) {
    console.log(error);
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
  refDetails.innerHTML = evolutionDetails(index);
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