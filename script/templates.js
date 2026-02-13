function getCardTemplate(index) {
  let pokemoName = preLoadCase[index].name.replace(/^./, char => char.toUpperCase());

  return ` 
    <section id="${index}" class="card bg_${preLoadCase[index].types[0].type.name}" onclick="showDetailedPokemonCard(${index})">
      <header>
        <h1>${pokemoName}</h1>
        <div class="cardNumber">#${preLoadCase[index].id}</div>
      </header>
      <figure>
        <img src="${preLoadCase[index].sprites.other.dream_world.front_default}" alt="">
        <figcaption class="types" id="types_${index}">
          <p class="type_one">${preLoadCase[index].types[0].type.name}</p>
        </figcaption>
      </figure>
    </section>
  `
}

function getTemplateSecType(preLoadCaseIndex) {
  return `
    <p class="type_two">${preLoadCase[preLoadCaseIndex].types[1].type.name}</p>
  `
}

function getTemplateDetailedPokemon(index) {
  let pokemoName = preLoadCase[index].name.replace(/^./, char => char.toUpperCase());

  return `
  <section class="detailedCard bg_${preLoadCase[index].types[0].type.name}">
    <div class="upperCardSpace">
      <header>
        <h1>${pokemoName}</h1>
      </header>
      <section id="imgSpace" class="imageSpace">
        <img src="${preLoadCase[index].sprites.other.dream_world.front_default}" alt="">
      </section>
    </div>
    <footer id="detailSpace" class="detailSpace">
      <nav class="navDetails">
        <button onclick="renderAboutDetails(${index})">About</button>
        <button onclick="renderBaseStatesDetails(${index})">Base Stats</button>
        <button onclick="renderEvolutionDetails(${index})">Evolution</button>
      </nav>
      <section id="genDetails">
        <!-- gen details -->
      </section>
    </footer>
  </section>`
}

// <div class="closeButtonSpace">
//   <button id="closeButton" type="button" onclick="closeDetailedPokemonCard()">X</button>
// </div>

function aboutDetails(index) {
  return `
    <table>
      <tr>
        <th>Species</th>
        <td>${preLoadCase[index].species.name}</td>
      </tr>
      <tr>
        <th>Height</th>
        <td>${preLoadCase[index].height} inch</td>
      </tr>
      <tr>
        <th>Weight</th>
        <td>${preLoadCase[index].weight} Ib</td>
      </tr>
      <tr>
        <th>Ability</th>
        <td id="ability"></td>
      </tr>
    </table>
  `
}

function baseStatesDetails(index) {
  return `
    <table>
      <tr>
        <th>HP</th>
        <td>${preLoadCase[index].stats[0].base_stat}</td>
        <td><div id="beamHP"></div></td>
      </tr>
      <tr>
        <th>Attack</th>
        <td>${preLoadCase[index].stats[1].base_stat}</td>
        <td><div id="beamAttack"></div></td>
      </tr>
      <tr>
        <th>Defense</th>
        <td>${preLoadCase[index].stats[2].base_stat}</td>
        <td><div id="beamDef"></div></td>
      </tr>
      <tr>
        <th>Sp.Atk</th>
        <td>${preLoadCase[index].stats[3].base_stat}</td>
        <td><div id="beamSpAtk"></div></td>
      </tr>
      <tr>
        <th>Sp.Def</th>
        <td>${preLoadCase[index].stats[4].base_stat}</td>
        <td><div id="beamSpDef"></div></td>
      </tr>
      <tr>
        <th>Speed</th>
        <td>${preLoadCase[index].stats[5].base_stat}</td>
        <td><div id="beamSpeed"></div></td>
      </tr>
    </table>
  `
}

function evolutionDetails() {
  return `
    <section class="evolutionSpace">
      <div id="evoOneSpace">
        <img src="${evoOneImg}" alt="">
        <h2>${evoOne}</h2>
      </div>
      <div id="evoTwoSpace">
        <h2>&#8659</h2>
        <img src="${evoTwoImg}" alt="">
        <h2>${evoTwo}</h2>
        </div>
        <div id="evoThreeSpace">
        <h2>&#8659</h2>
        <img src="${evoThreeImg}" alt="">
        <h2>${evoThree}</h2>
      </div>
    </section>
    `
}