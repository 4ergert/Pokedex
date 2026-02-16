let preLoadCase = [];
let evoPreLoadCase = [];
let pokemonNames = [];
let evoPreLoad;
let amountOfPokemons = 12;
let checkPromise
let evoOne;
let evoTwo;
let evoThree;
let evoOneImg;
let evoTwoImg;
let evoThreeImg;
let checkEvoThree;
let isSecEvoThree = false;
let isLastEvoThree = false;

async function fetchThenRender() {
  try {
    await fechtDataJSON();
    await getPromise();
    render();
    renderPokemonNames()
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
};

function render() {
  for (let preLoadCaseIndex = 0; preLoadCaseIndex < preLoadCase.length; preLoadCaseIndex++) {
    document.getElementById("content").innerHTML += getCardTemplate(preLoadCaseIndex);
    pokemonNames.push(preLoadCase[preLoadCaseIndex].name);
    if (preLoadCase[preLoadCaseIndex].types.length > 1) {
      document.getElementById(`types_${preLoadCaseIndex}`).innerHTML += getTemplateSecType(preLoadCaseIndex);
    };
  };
};

function showDetailedPokemonCard(index) {
  const refPokemonCard = document.getElementById("detailedPokemonCard");

  location.href = `#`;
  location.href = `#${index}`;
  document.getElementById("body").style.overflow = "hidden";
  refPokemonCard.showModal();
  refPokemonCard.innerHTML = getTemplateDetailedPokemon(index);
  renderAboutDetails(index);
  backdropClose(refPokemonCard);
};

// render about Details
async function renderAboutDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "flex";
  refDetailSpace.style.height = "292px";
  refDetails.innerHTML = aboutDetails(index);
  renderAbilities(index);
  // refEvoURL = await fetchEvolution(index)
  // await tryCatchEvoTree()
};

function renderAbilities(index) {
  const refAbility = document.getElementById("ability");
  if (preLoadCase[index].abilities.length > 1) {
    for (let abilitiesIndex = 0; abilitiesIndex < preLoadCase[index].abilities.length; abilitiesIndex++) {
      refAbility.innerHTML += preLoadCase[index].abilities[abilitiesIndex].ability.name + '<br>';
    };
  };
};

// render base states details
function renderBaseStatesDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "flex";
  refDetailSpace.style.height = "292px";
  refDetails.innerHTML = baseStatesDetails(index);
  renderBeam(index);
}

function renderBeam(index) {
  let lengthHP = preLoadCase[index].stats[0].base_stat * 1.5;
  document.getElementById("beamHP").style.width = `${lengthHP}px`;
  let lengthAttack = preLoadCase[index].stats[1].base_stat * 1.5;
  document.getElementById("beamAttack").style.width = `${lengthAttack}px`;
  let lengthDefense = preLoadCase[index].stats[2].base_stat * 1.5;
  document.getElementById("beamDef").style.width = `${lengthDefense}px`;
  let lengthSpAtk = preLoadCase[index].stats[3].base_stat * 1.5;
  document.getElementById("beamSpAtk").style.width = `${lengthSpAtk}px`;
  let lengthspDef = preLoadCase[index].stats[4].base_stat * 1.5;
  document.getElementById("beamSpDef").style.width = `${lengthspDef}px`;
  let Speed = preLoadCase[index].stats[5].base_stat * 1.5;
  document.getElementById("beamSpeed").style.width = `${Speed}px`;
}

// render evolution
async function renderEvolutionDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "none";
  refDetails.innerHTML = 'Evolution is rendering';
  refDetailSpace.style.height = "526px";

  refEvoURL = await fetchEvolution(index);
  await tryCatchEvoTree();
  refDetails.innerHTML = evolutionDetails();
  showEvo();
};

async function fetchEvolution(index) {
  let refEvoChainURL = await fetch(preLoadCase[index].species.url);
  let refUrlAsJSON = await refEvoChainURL.json();
  let refEvoURL = refUrlAsJSON.evolution_chain.url;

  let responseEvo = await fetch(`${refEvoURL}`);
  let responseEvoAsJson = await responseEvo.json();

  evoPreLoad = (responseEvoAsJson);
};

async function tryCatchEvoTree() {
  try {
    checkPromise = evoPreLoad.chain.length;
    await getPromiseForEvoThree(checkPromise)
    await getEvoOne()

    checkPromise = evoPreLoad.chain.evolves_to.length;
    await getPromiseForEvoThree(checkPromise)
    await getEvoTwo()

    checkPromise = evoPreLoad.chain.evolves_to[0].evolves_to.length;
    await getPromiseForEvoThree(checkPromise)
    await getEvoThree()
  } catch (error) {
    if (evoPreLoad.chain.evolves_to.length != 1) isSecEvoThree = false;
    isLastEvoThree = false;
  };
};

function showEvo() {
  let evoTwoDisplay = isSecEvoThree == true ? "flex" : "none";
  document.getElementById("evoTwoSpace").style.display = evoTwoDisplay;
  let evoThreeDisplay = isLastEvoThree == true ? "flex" : "none";
  document.getElementById("evoThreeSpace").style.display = evoThreeDisplay;
};

async function getPromiseForEvoThree(checkPromise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkPromise == 0) {
        reject("it don't work");
      } else {
        resolve("it works");
      };
    }, 500);
  });
};

async function getEvoOne() {
  evoOne = evoPreLoad.chain.species.name.replace(/^./, char => char.toUpperCase());
  // let outputOne = evoPreLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.species.name}`);
  // for (let i = 0; i < outputOne.length; i++) evoOneImg = outputOne[i].sprites.other.dream_world.front_default;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoOne}`);
  let responseAsJson = await response.json();
  evoOneImg = await responseAsJson.sprites.other.dream_world.front_default;
}

async function getEvoTwo() {
  evoTwo = evoPreLoad.chain.evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
  // let outputTwo = preLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.evolves_to[0].species.name}`);
  // for (let i = 0; i < outputTwo.length; i++) evoTwoImg = outputTwo[i].sprites.other.dream_world.front_default;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoTwo}`);
  let responseAsJson = await response.json();
  evoTwoImg = await responseAsJson.sprites.other.dream_world.front_default;
  isSecEvoThree = true;
}

async function getEvoThree() {
  evoThree = evoPreLoad.chain.evolves_to[0].evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
  // let outputThree = preLoadCase.filter(employee => employee.name == `${evoPreLoad.chain.evolves_to[0].evolves_to[0].species.name}`);
  // for (let i = 0; i < outputThree.length; i++) evoThreeImg = outputThree[i].sprites.other.dream_world.front_default;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoThree}`);
  let responseAsJson = await response.json();
  evoThreeImg = await responseAsJson.sprites.other.dream_world.front_default;
  isLastEvoThree = true;
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
      document.getElementById("body").style.overflow = "scroll";
    };
  });
};

//serch bar 
function renderPokemonNames() {
  let refPokemonNames = document.getElementById("pokemonNames");
  for (let pokemonNameIndex = 0; pokemonNameIndex < pokemonNames.length; pokemonNameIndex++) {
    refPokemonNames.innerHTML += `
      <li><a href="#">${preLoadCase[pokemonNameIndex].name}</a></li>    
    `
  };
};

//(https://codepen.io/jaredgroff/pen/bGxJaXe)
function searchPokemon() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.querySelector("#searchPokemon");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".pokemon_names");
  li = ul.getElementsByTagName("li");
  if (input.value.length < 3) {
    document.getElementById("content").innerHTML = "";
    ul.style.display = "none";
    render();
  }
  searchNshowPokemonNames(input, filter, ul, li, a, i, txtValue);
}

function searchNshowPokemonNames(input, filter, ul, li, a, i, txtValue) {
  if (input.value.length > 2) {
    ul.style.display = "flex";
    document.getElementById("content").innerHTML = "";
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        renderPokemonCards(i);
      } else {
        li[i].style.display = "none";
      };
    };
  };
};

function renderPokemonCards(i) {
  document.getElementById("content").innerHTML += getCardTemplate(i);
  pokemonNames.push(preLoadCase[i].name)
  if (preLoadCase[i].types.length > 1) {
    document.getElementById(`types_${i}`).innerHTML += getTemplateSecType(i);
  };
};