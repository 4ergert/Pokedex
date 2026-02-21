let preLoadCase = [];
let evoPreLoadCase = [];
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
  const refLoadingBall = document.getElementById("loadingBall");
  const refShowMorePokemonsButton = document.getElementById("renderMorePokemons");

  try {
    refLoadingBall.style.display = "flex";
    refShowMorePokemonsButton.style.display = "none";
    await fechtDataJSON();
    await getPromise();
    refLoadingBall.style.display = "none";
    refShowMorePokemonsButton.style.display = "flex";
    render();
    renderPokemonNames()
  } catch (error) {
    console.error(error);
  }
};

async function fechtDataJSON() {
  let more = preLoadCase.length + amountOfPokemons
  for (let pokemonIndex = 1 + preLoadCase.length; pokemonIndex <= more; pokemonIndex++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
    let responseAsJson = await response.json();
    preLoadCase.push(responseAsJson);
  };
};

async function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (preLoadCase.length == 0) {
        reject("it don't work");
      } else {
        resolve("it works");
      };
    }, 500);
  });
};

function render() {
  document.getElementById("content").innerHTML = '';
  for (let preLoadCaseIndex = 0; preLoadCaseIndex < preLoadCase.length; preLoadCaseIndex++) {
    document.getElementById("content").innerHTML += getCardTemplate(preLoadCaseIndex);
    if (preLoadCase[preLoadCaseIndex].types.length > 1) {
      document.getElementById(`types_${preLoadCaseIndex}`).innerHTML += getTemplateSecType(preLoadCaseIndex);
    };
  };
};

function showDetailedPokemonCard(index) {
  const refPokemonCard = document.getElementById("detailedPokemonCard");

  document.getElementById("body").style.overflow = "hidden";
  location.href = index !== 'undefined' ? `#${index}` : `#`;
  refPokemonCard.showModal();
  refPokemonCard.innerHTML = getTemplateDetailedPokemon(index);
  renderArrowsInDetailedCards(index);
  renderAboutDetails(index);
  backdropClose(refPokemonCard);
};

function renderArrowsInDetailedCards(index) {
  let arrowLeft = document.getElementById("arrowLeft");
  let arrowRight = document.getElementById("arrowRight");

  arrowLeft.style.display = index > 0 ? "flex" : "none";
  arrowRight.style.display = index < preLoadCase.length - 1 ? "flex" : "none";
}

// render about Details
async function renderAboutDetails(index) {
  let refDetails = document.getElementById("genDetails");
  let refImg = document.getElementById("imgSpace");
  let refDetailSpace = document.getElementById("detailSpace");

  refImg.style.display = "flex";
  refDetailSpace.style.height = window.innerWidth <= 400 ? "243px" : "292px";
  refDetails.style.justifyContent = "start";
  refDetails.innerHTML = aboutDetails(index);
  renderAbilities(index);
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
  refDetailSpace.style.height = window.innerWidth <= 400 ? "243px" : "292px";
  refDetails.style.justifyContent = "start";
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
  refDetails.innerHTML = loadingBall();
  refDetails.style.justifyContent = "center";
  refDetailSpace.style.height = window.innerWidth <= 400 ? "475px" : "526px";

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
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoOne}`);
  let responseAsJson = await response.json();
  evoOneImg = await responseAsJson.sprites.other.dream_world.front_default;
}

async function getEvoTwo() {
  evoTwo = evoPreLoad.chain.evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoTwo}`);
  let responseAsJson = await response.json();
  evoTwoImg = await responseAsJson.sprites.other.dream_world.front_default;
  isSecEvoThree = true;
}

async function getEvoThree() {
  evoThree = evoPreLoad.chain.evolves_to[0].evolves_to[0].species.name.replace(/^./, char => char.toUpperCase());
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoThree}`);
  let responseAsJson = await response.json();
  evoThreeImg = await responseAsJson.sprites.other.dream_world.front_default;
  isLastEvoThree = true;
}

// pre pokemon
function loadPrePokemon(index) {
  index--
  if (index >= 0) showDetailedPokemonCard(index);
}

// post pokemon
function loadPostPokemon(index) {
  index++
  if (index <= preLoadCase.length - 1) showDetailedPokemonCard(index);
}

//close dialog
function closeCard() {
  let refPokemonCard = document.getElementById("detailedPokemonCard");
  refPokemonCard.close();
  document.getElementById("body").style.overflow = "scroll";
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
  refPokemonNames.innerHTML = '';
  for (let pokemonNameIndex = 0; pokemonNameIndex < preLoadCase.length; pokemonNameIndex++) {
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
    showButton();
  }
  searchNshowPokemonNames(input, filter, ul, li, a, i, txtValue);
  clickOnPokemonName();
}

function showButton() {
  let refContent = document.getElementById("content");
  let refShowMorePokemonsButton = document.getElementById("renderMorePokemons");
  if (refContent.innerHTML !== "") {
    refShowMorePokemonsButton.style.display = "flex";
  };
}

function searchNshowPokemonNames(input, filter, ul, li, a, i, txtValue) {
  let refContent = document.getElementById("content");
  if (input.value.length > 2) {
    ul.style.display = "flex";
    refContent.innerHTML = "";
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        renderPokemonCardsBySerching(i);
      } else {
        li[i].style.display = "none";
      };
    };
    pokemonNotFound(refContent);
  };
};

function renderPokemonCardsBySerching(i) {
  let refContent = document.getElementById("content");
  let refShowMorePokemonsButton = document.getElementById("renderMorePokemons");
  if (refContent.innerHTML == "") {
    refShowMorePokemonsButton.style.display = "none";
  };

  document.getElementById("content").innerHTML += getCardTemplate(i);
  if (preLoadCase[i].types.length > 1) {
    document.getElementById(`types_${i}`).innerHTML += getTemplateSecType(i);
  };
};

function clickOnPokemonName() {
  addEventListener('click', (e) => {
    for (let i = 0; i < preLoadCase.length; i++) {
      if (e.target.outerText === preLoadCase[i].name) {
        showDetailedPokemonCard(i);
      };
    };
  });
};

function pokemonNotFound(refContent) {
  let refShowMorePokemonsButton = document.getElementById("renderMorePokemons");

  if (refContent.innerHTML == "") {
    refContent.innerHTML = "Pokemon not found";
    refShowMorePokemonsButton.style.display = "none";
  }
}