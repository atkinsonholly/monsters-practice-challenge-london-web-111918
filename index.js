document.addEventListener('DOMContentLoaded', init());


function init() {
  addFormToPage();
  getMonstersFromDB();
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelector('.form-wrapper').addEventListener("submit", createNewMonster);
  document.querySelector('#forward').addEventListener("click", fetchMoreMonsters)
}

function addFormToPage(){
  const newMonsterFormBox = document.querySelector('#create-monster')
  newMonsterFormBox.innerHTML = addFormContent();
}

function addFormContent(){
  return `
  <div class="form-wrapper">
    <form >
      <label>Name</label>
      <input id=monster_name type="text" value="" />
      <label>Age</label>
      <input id=monster_age type="text" value="" />
      <label>Description</label>
      <input id=monster_description type="text" value="" />
      <div class="form-nav-buttons">
        <button class="save" type='submit'>Create Monster!</button>
      </div>
    </form>
  </div>
  `
}

function getMonstersFromDB() {
  fetchMonsters()
  .then(renderEachMonsterToPage)
}

function renderEachMonsterToPage(monsters) {
  monsters.forEach(monster => renderMonster(monster))
}

function renderMonster(monster) {
  const monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML += addMonsterContent(monster);
}

function addMonsterContent(monster) {
  return `
      <div class="monster">
        <h1 class="monster_name" data-id=${monster.id}>${monster.name}</h1>
        <h3 class="monster_age" data-id=${monster.id}>${monster.age}</h3>
        <p class="monster_description" data-id=${monster.id}>${monster.description}</p>
      </div>
  `
}

function createNewMonster() {
  const name = document.querySelector('#monster_name').value
  const age = document.querySelector('#monster_age').value
  const description = document.querySelector('#monster_description').value
  saveMonsterToDB(name, age, description)
  .then(getMonstersFromDB);
}

function fetchMoreMonsters() {
  
}

//--------------
// API functions
//--------------

function fetchMonsters() {
  const baseURL = 'http://localhost:3000/monsters/'
  const limit = '?_limit=50'
  return fetch(baseURL + limit)
  .then(response => response.json())
}

function saveMonsterToDB(name, age, description) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }
  return fetch(`http://localhost:3000/monsters`, options)
    .then(response => response.json())
}
