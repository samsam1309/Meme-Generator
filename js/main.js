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

function loadSavedMemes() {
    const savedMemesContainer = document.getElementById('saved-memes');
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];

    savedMemesContainer.innerHTML = '';
    savedMemes.forEach((meme, index) => {
        const memeContainer = document.createElement('div');
        memeContainer.classList.add('saved-meme-container');

        const imgElement = document.createElement('img');
        imgElement.src = meme.url;
        imgElement.alt = `Saved Meme ${index + 1}`;
        imgElement.classList.add('saved-meme-image');
        memeContainer.appendChild(imgElement);

        const textElement = document.createElement('p');
        textElement.textContent = meme.text;
        memeContainer.appendChild(textElement);

        savedMemesContainer.appendChild(memeContainer);
    });
}

function saveMeme() {
    const currentMeme = {
        text: document.getElementById('text-input').value,
        url: 'img/your-meme-image.jpg',
    };

    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];
    savedMemes.push(currentMeme);
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));

    alert('Meme saved successfully!');
}
