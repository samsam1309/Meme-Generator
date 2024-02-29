function selectImage(imgId) {
    gMeme.selectedImgId = imgId;
    renderMeme();
}

var gMeme = {
    selectedImgId: null,
    lines: [
        { txt: '', size: 20, color: 'black', yPos: 50 },
        { txt: '', size: 20, color: 'black', yPos: 450 } 
    ],
    selectedLineIdx: 0,
    showBorder: true 
};


function getMeme() {
    return gMeme;
}

function toggleBorder() {
    var meme = getMeme();
    meme.showBorder = !meme.showBorder; 
    renderMeme();
}

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

            if (line.yPos === 450) {
                context.fillText(line.txt, canvas.width / 2, canvas.height - 20);
            } else {
                context.fillText(line.txt, canvas.width / 2, line.yPos);
            }

            if (meme.showBorder && meme.selectedLineIdx !== null && meme.selectedLineIdx === index) {
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



function toggleLine() {
    var meme = getMeme();

    meme.selectedLineIdx = (meme.selectedLineIdx === 0) ? 1 : 0;

    var textInput = document.getElementById('text-input');
    textInput.value = meme.lines[meme.selectedLineIdx] ? meme.lines[meme.selectedLineIdx].txt : '';

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

    renderMeme();
}


function handleTextInputChange() {
    updateText();
}

function addText() {
    updateText();
}


var canvas = document.getElementById('editor-canvas');
canvas.addEventListener('click', handleCanvasClick);


function handleCanvasClick(event) {
    var meme = getMeme();
    var canvas = document.getElementById('editor-canvas');
    var canvasRect = canvas.getBoundingClientRect();
    var clickX = event.clientX - canvasRect.left;
    var clickY = event.clientY - canvasRect.top;

    for (var i = 0; i < meme.lines.length; i++) {
        var line = meme.lines[i];
        var textWidth = context.measureText(line.txt).width;
        var textHeight = line.size;

        if (
            clickX >= canvas.width / 2 - textWidth / 2 &&
            clickX <= canvas.width / 2 + textWidth / 2 &&
            clickY >= line.yPos - textHeight &&
            clickY <= line.yPos
        ) {
            meme.selectedLineIdx = i;
            renderMeme();
            return;
        }
    }

    meme.selectedLineIdx = null;
    renderMeme();
}

