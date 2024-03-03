function handleColorChange() {
    var fontColorPicker = document.getElementById('font-color-picker');
    var selectedColor = fontColorPicker.value;

    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].color = selectedColor;
        renderMeme();
    }
}


function increaseFontSize() {
    adjustFontSize(2); 
}

function decreaseFontSize() {
    adjustFontSize(-2); 
}

function adjustFontSize(delta) {
   
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].size += delta;
        renderMeme();
    }
}


function handleDownloadButtonClick() {
    downloadMeme();
}


function handleFontFamilyChange() {
    var fontFamilySelect = document.getElementById('font-family');
    var selectedFontFamily = fontFamilySelect.value;
    setFontFamily(selectedFontFamily);
}

function handleFontSizeChange() {
    var fontSizeInput = document.getElementById('font-size');
    var selectedFontSize = parseInt(fontSizeInput.value);
    setFontSize(selectedFontSize);
}


function alignText(align) {
    // Get the canvas and text input
    var canvas = document.getElementById("editor-canvas");
    var textInput = document.getElementById("text-input");

    // Get the context and current selected line
    var context = canvas.getContext("2d");
    var selectedLine = getCurrentSelectedLine();

    // Set the alignment based on the user's choice
    switch (align) {
        case "left":
            context.textAlign = "left";
            break;
        case "center":
            context.textAlign = "center";
            break;
        case "right":
            context.textAlign = "right";
            break;
        default:
            // Default to left alignment if the input is invalid
            context.textAlign = "left";
            break;
    }

    // Set the text alignment for the selected line
    if (selectedLine !== null) {
        selectedLine.alignment = align;
        redrawCanvas();
    }
}


function getCanvasWidth() {
    var canvas = document.getElementById('editor-canvas');
    return canvas.width;
}

function getTextWidth(line) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    context.font = line.size + 'px ' + line.fontFamily || 'Arial';
    var textWidth = context.measureText(line.txt).width;
    console.log("Text Width: " + textWidth);

    return textWidth;
}




function setFontFamily(fontFamily) {
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].fontFamily = fontFamily;
        renderMeme();
    }
}

function setFontSize(fontSize) {
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].size = fontSize;
        renderMeme();
    }
}

function deleteLine() {
    var meme = getMeme();

    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].txt = "";
        renderMeme();
    }
}


function moveLine(direction) {
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].yPos += direction;
        renderMeme();
    }
}

function handleArrowClick(direction) {
    moveLine(direction);
}

function rotateLine(direction) {
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        var rotationAngle = (direction === "clockwise") ? Math.PI / 18 : -Math.PI / 18;
        meme.lines[meme.selectedLineIdx].rotation += rotationAngle;
        renderMeme();
    }
}
