let games = [];

class Game {
    
    constructor(title, rating, description) {
        this.title = title;
        this.rating = rating;
        this.description = description;
    }
    
    get titleNode() {
        return document.createTextNode(this.title);
    }

    get ratingNode() {
        return document.createTextNode(this.rating);
    }
}

function createTestGames() {
    let testGames = [
        new Game("Gra 1", 10, "Opis 1"),
        new Game("Gra 2", 2, "Opis 2"),
        new Game("Gra 3", 4, "Opis 3"),
        new Game("Gra 4", 5, "Opis 4")
    ]
    
    testGames.forEach(addRow);
}

function deleteGameFromArray(title) {
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        if (game.title === title) {
            games.splice(i, 1);
        }
    }
}

function getGame(title) {
    for (let g of games) {
        if (g.title === title) {
            return g;
        }
    }
}

function getDescButton() {
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Pokaż szczegóły"));
    button.addEventListener("click", event => viewDescription(event));
    return button;
}

function getDeleteButton() {
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Usuń"));
    button.addEventListener('click', event => deleteGame(event));
    return button;
}

function registerAddGame() {
    let addGameButton = document.getElementById("add-game-button");
    addGameButton.addEventListener("click", (event) => addGameToTable(event));
    addGameButton.addEventListener("click", clearForm);
}

function deleteGame(event) {
    let gameRow = event.target.parentElement.parentElement;
    let title = gameRow.getElementsByClassName("title").item(0).innerText;
    deleteGameFromArray(title);
    gameRow.remove();
}

function viewDescription(event) {
    let gameRow = event.target.parentElement.parentElement;
    let title = gameRow.getElementsByClassName("title").item(0).innerText;
    let game = getGame(title);
    if (game !== undefined) {
        let descDiv = document.getElementById("description-show");
        let paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode("Opis gry: " + game.description));
        descDiv.replaceChildren(paragraph);
    }
}

function clearForm() {
    let inputs = document.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = '';
    }
}

function addGameToTable(event) {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let rating = document.getElementById("rating").value;
    let description = document.getElementById("description").value;

    if (title !== '' && rating !== '' && description !== '') {
        let game = new Game(title, rating, description);
        addRow(game);
    }
}

function addRow(game) {
    games.push(game);

    let tbody = document.getElementById("games");

    let row = tbody.insertRow();
    let titleCell = row.insertCell();
    titleCell.appendChild(game.titleNode);
    titleCell.classList.add("title");
    let ratingCell = row.insertCell();
    ratingCell.appendChild(game.ratingNode);
    let descCell = row.insertCell();
    descCell.appendChild(getDescButton());
    let deleteCell = row.insertCell();
    deleteCell.appendChild(getDeleteButton());
}

createTestGames();
registerAddGame();