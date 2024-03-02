var currentMode = 'gallery';

function toggleMode(mode) {
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('saved-memes').style.display = 'none';
    document.getElementById('editor-container').style.display = 'none';

    if (mode === 'gallery') {
        document.getElementById('gallery').style.display = 'flex';
    } else if (mode === 'memes') {
        document.getElementById('saved-memes').style.display = 'flex';
        loadSavedMemes();
    } else if (mode === 'editor') {
        document.getElementById('editor-container').style.display = 'flex';
    }
}

function getRandomImageId() {
    return Math.floor(Math.random() * 18) + 1;
}

function getRandomText() {
    var texts = ["The sprint is on canvas", "Another one", "Are you sure about that?!?"];
    var randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function generateRandomMeme() {
    var randomImageId = getRandomImageId();

    var randomText = getRandomText();

    gMeme.selectedImgId = randomImageId;
    gMeme.lines = [
        { txt: randomText, size: 30, color: 'white', yPos: 50 }
    ];
    gMeme.selectedLineIdx = 0;

    renderMeme();
}
