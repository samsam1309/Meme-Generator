function handleColorChange() {
    var fontColorPicker = document.getElementById('font-color-picker');
    var selectedColor = fontColorPicker.value;
    
    // Update the color of the selected line in gMeme
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].color = selectedColor;
        renderMeme();
    }
}

function increaseFontSize() {
    adjustFontSize(2); // You can adjust the value as needed
}

function decreaseFontSize() {
    adjustFontSize(-2); // You can adjust the value as needed
}

function adjustFontSize(delta) {
    // Adjust the font size of the selected line in gMeme
    var meme = getMeme();
    if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].size += delta;
        renderMeme();
    }
}


function handleDownloadButtonClick() {
    downloadMeme();
}
