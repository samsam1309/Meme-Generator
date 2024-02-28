"use strict";

// Fonctions liées aux actions de l'utilisateur
function handleAddTextButtonClick() {
    const textInput = prompt("Entrez le texte à ajouter à la canvas:");
    if (textInput) {
        addTextToCanvas(textInput);
    }
}

function handleClearTextButtonClick() {
    clearTextOnCanvas();
}

function handleSelectTextButtonClick() {
    selectTextOnCanvas();
}

// Ajoutez des écouteurs d'événements aux boutons
document.getElementById('add-text-btn').addEventListener('click', handleAddTextButtonClick);
document.getElementById('clear-text-btn').addEventListener('click', handleClearTextButtonClick);
document.getElementById('select-text-btn').addEventListener('click', handleSelectTextButtonClick);