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
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].align = align;
        renderMeme();
    }
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

