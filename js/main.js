var currentMode = 'gallery';

function toggleMode(mode) {
    // Cache toutes les sections au début
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('saved-memes').style.display = 'none';
    document.getElementById('editor-container').style.display = 'none';

    // Affiche la section correspondante au mode sélectionné
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

    // Récupérez les mèmes sauvegardés depuis le localStorage
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];

    // Vous devrez remplir savedMemesContainer avec les mèmes sauvegardés
    // Vous pouvez utiliser une boucle pour créer des éléments d'image ou tout autre format que vous souhaitez

    // Exemple avec des éléments d'image et de texte
    savedMemesContainer.innerHTML = '';
    savedMemes.forEach((meme, index) => {
        const memeContainer = document.createElement('div');
        memeContainer.classList.add('saved-meme-container');

        // Créer une balise d'image
        const imgElement = document.createElement('img');
        imgElement.src = meme.url;
        imgElement.alt = `Saved Meme ${index + 1}`;
        imgElement.classList.add('saved-meme-image');
        memeContainer.appendChild(imgElement);

        // Créer une balise de texte
        const textElement = document.createElement('p');
        textElement.textContent = meme.text;
        memeContainer.appendChild(textElement);

        // Ajouter le conteneur de mème à la section des mèmes sauvegardés
        savedMemesContainer.appendChild(memeContainer);
    });
}


function saveMeme() {
    // Assuming you have a meme object representing the current meme
    const currentMeme = {
        // Include relevant meme data, e.g., text, colors, etc.
        text: document.getElementById('text-input').value,
        url: 'img/your-meme-image.jpg',  // Insérez ici le chemin de votre image
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
