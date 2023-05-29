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
}

function deleteGame(event) {
    let gameIndex = event.target.parentElement.parentElement.rowIndex - 1;
    games.splice(gameIndex, 1);
    document.getElementById("game-table").deleteRow(gameIndex);
}

function viewDescription(event) {
    let gameIndex = event.target.parentElement.parentElement.rowIndex - 1;
    let game = games[gameIndex];
    if (game !== undefined) {
        let descParagraph = document.getElementById("game-description");
        descParagraph.replaceChildren(document.createTextNode("Opis gry: " + game.description));
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
    if (title !== '' && rating !== '' && description !== '' && isRatingValid(rating)) {
        clearForm();
        let game = new Game(title, rating, description);
        addRow(game);
    } else {
        alert("Nieprawidłowy format danych. Pola nie mogą być puste, a ocena musi zawierać się między 1, a 10.");
    }
}

function isRatingValid(rating) {
    return rating >=1 && rating <= 10;
}

function addRow(game) {
    games.push(game);

    let tbody = document.getElementById("game-table");

    let row = tbody.insertRow();
    let titleCell = row.insertCell();
    titleCell.appendChild(game.titleNode);
    let ratingCell = row.insertCell();
    ratingCell.appendChild(game.ratingNode);
    let descCell = row.insertCell();
    descCell.appendChild(getDescButton());
    let deleteCell = row.insertCell();
    deleteCell.appendChild(getDeleteButton());
}

createTestGames();
registerAddGame();