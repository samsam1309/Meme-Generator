function selectImage(imgId) {
    // Update selectedImgId in gMeme
    gMeme.selectedImgId = imgId;

    // Call renderMeme to render the selected image
    renderMeme();
}

// Add these variables to your existing code
// Add the showBorder property to gMeme
var gMeme = {
    selectedImgId: null,
    lines: [
        { txt: '', size: 20, color: 'black', yPos: 50 }, // First line
        { txt: '', size: 20, color: 'black', yPos: 450 } // Second line
    ],
    selectedLineIdx: 0,
    showBorder: true // Add this line
};


function getMeme() {
    return gMeme;
}
// ... (votre code existant)

// Ajoutez cette fonction à votre script
function toggleBorder() {
    var meme = getMeme();
    meme.showBorder = !meme.showBorder; // Inversez l'état actuel de la bordure
    renderMeme();
}

// Modifiez la fonction renderMeme pour prendre en compte l'état de la bordure
function renderMeme() {
    var meme = getMeme();
    console.log("meme", meme);

    var canvas = document.getElementById('editor-canvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        meme.lines.forEach(function (line, index) {
            context.font = line.size + 'px ' + line.fontFamily || 'Arial';
            context.fillStyle = line.color;
            context.textAlign = line.align || 'center';

            // Adjust the Y-coordinate based on the position of the line
            if (line.yPos === 450) {
                // For the second line, adjust the Y-coordinate
                context.fillText(line.txt, canvas.width / 2, canvas.height - 20);
            } else {
                // For the first line, use the provided Y-coordinate
                context.fillText(line.txt, canvas.width / 2, line.yPos);
            }

            if (meme.showBorder && meme.selectedLineIdx !== null && meme.selectedLineIdx === index) {
                // Draw a dashed border around the text area only when the line is selected and showBorder is true
                context.strokeStyle = 'white';
                context.lineWidth = 2;
                context.setLineDash([5, 3]);
                context.strokeRect(canvas.width / 4, (line.yPos === 450 ? canvas.height - 20 - line.size : line.yPos - line.size), canvas.width / 2, line.size * 2);
                context.setLineDash([]);
            }
        });
    };

    var selectedImgId = meme.selectedImgId || 1;
    img.src = 'img/' + selectedImgId + '.jpg';

    toggleMode("editor");
}


// ... (autres fonctions existantes)

function toggleLine() {
    var meme = getMeme();

    // Basculer entre les lignes lorsqu'on appuie sur le bouton
    meme.selectedLineIdx = (meme.selectedLineIdx === 0) ? 1 : 0;

    // Mettez à jour le champ de texte avec le texte de la ligne sélectionnée
    var textInput = document.getElementById('text-input');
    textInput.value = meme.lines[meme.selectedLineIdx] ? meme.lines[meme.selectedLineIdx].txt : '';

    // Appelez renderMeme pour mettre à jour le canevas avec la ligne sélectionnée
    renderMeme();
}


function updateText() {
    var textInput = document.getElementById('text-input');
    var meme = getMeme();

    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].txt = textInput.value;
    } else {
        var nouvelleLigne = {
            txt: textInput.value,
            size: 20,
            color: 'noir',
            yPos: meme.lines.length === 0 ? 50 : 450  // Ajustez la position Y en fonction du nombre de lignes
        };
        meme.lines.push(nouvelleLigne);
        meme.selectedLineIdx = meme.lines.length - 1;
    }

    // Appelez renderMeme pour mettre à jour le canevas avec le nouveau texte
    renderMeme();
}


function handleTextInputChange() {
    updateText();
}

function addText() {
    updateText();
}


// Ajoutez ceci dans votre code JavaScript
var canvas = document.getElementById('editor-canvas');
canvas.addEventListener('click', handleCanvasClick);


// Ajoutez cette fonction dans votre code JavaScript
function handleCanvasClick(event) {
    var meme = getMeme();
    var canvas = document.getElementById('editor-canvas');
    var canvasRect = canvas.getBoundingClientRect();
    var clickX = event.clientX - canvasRect.left;
    var clickY = event.clientY - canvasRect.top;

    // Parcourez les lignes du meme pour voir si le clic est à proximité d'une ligne
    for (var i = 0; i < meme.lines.length; i++) {
        var line = meme.lines[i];
        var textWidth = context.measureText(line.txt).width;
        var textHeight = line.size;

        // Vérifiez si le clic est dans les limites du texte de la ligne
        if (
            clickX >= canvas.width / 2 - textWidth / 2 &&
            clickX <= canvas.width / 2 + textWidth / 2 &&
            clickY >= line.yPos - textHeight &&
            clickY <= line.yPos
        ) {
            // Sélectionnez cette ligne si le clic est sur le texte
            meme.selectedLineIdx = i;
            renderMeme();
            return;
        }
    }

    // Si le clic ne se trouve à proximité d'aucune ligne existante, désélectionnez la ligne
    meme.selectedLineIdx = null;
    renderMeme();
}

