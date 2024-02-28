// meme.service.js
"use strict";

// Données du meme
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: []
};

// Fonction pour récupérer le meme
function getMeme() {
    return gMeme;
}

// Fonction pour mettre à jour l'image sélectionnée dans le meme
function setSelectedImage(imageId) {
    gMeme.selectedImgId = imageId;
}

// Fonction pour ajouter une ligne de texte au meme
function addTextLine(text, size, color) {
    const newLine = { txt: text, size: size, color: color };
    gMeme.lines.push(newLine);
}
