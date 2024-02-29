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
        // Clear the text content of the selected line
        meme.lines[meme.selectedLineIdx].txt = "";
        renderMeme();
    }
}


function saveMeme() {
    // Assuming you have a meme object representing the current meme
    const currentMeme = {
        // Include relevant meme data, e.g., text, colors, etc.
        text: document.getElementById('text-input').value,
        // Add other meme data...
    };

    // Get saved memes from localStorage or initialize an empty array
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];

    // Add the current meme to the saved memes array
    savedMemes.push(currentMeme);

    // Save the updated saved memes array back to localStorage
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));

    // Optionally, you can display a message or perform other actions after saving
    alert('Meme saved successfully!');
}


