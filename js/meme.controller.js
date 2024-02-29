function selectImage(imgId) {
    // Update selectedImgId in gMeme
    gMeme.selectedImgId = imgId;

    // Call renderMeme to render the selected image
    renderMeme();
}

// Add these variables to your existing code
var gMeme = {
    selectedImgId: null,
    lines: [
        { txt: '', size: 20, color: 'black', yPos: 50 }, // First line
        { txt: '', size: 20, color: 'black', yPos: 450 } // Second line
    ],
    selectedLineIdx: 0
};

function getMeme() {
    return gMeme;
}

function renderMeme() {
    var meme = getMeme();
    console.log("meme", meme);

    var canvas = document.getElementById('editor-canvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        meme.lines.forEach(function (line) {
            context.font = line.size + 'px Arial';
            context.fillStyle = line.color;
            context.textAlign = 'center';

            // Adjust the Y-coordinate based on the position of the line
            if (line.yPos === 450) {
                // If it's the second line, position it at the bottom
                context.fillText(line.txt, canvas.width / 2, canvas.height - 20); // You can adjust the offset as needed
            } else {
                // For the first line, use the provided Y-coordinate
                context.fillText(line.txt, canvas.width / 2, line.yPos);
            }

        });
    };

    var selectedImgId = meme.selectedImgId || 1;
    img.src = 'img/' + selectedImgId + '.jpg';

    toggleMode("editor");
}


function toggleLine() {
    var meme = getMeme();

    // Basculer entre les lignes lorsqu'on appuie sur le bouton
    meme.selectedLineIdx = (meme.selectedLineIdx === 0) ? 1 : 0;

    // Mettez à jour le champ de texte avec le texte de la ligne sélectionnée
    var textInput = document.getElementById('text-input');
    textInput.value = meme.lines[meme.selectedLineIdx] ? meme.lines[meme.selectedLineIdx].txt : '';
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

    renderMeme();
}

function handleTextInputChange() {
    updateText();
}

function addText() {
    updateText();
}
