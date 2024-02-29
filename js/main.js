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
    const savedMemes = JSON.parse(localStorage.getItem('mèmesSauvegardés')) || [];

    // Vous devrez remplir savedMemesContainer avec les mèmes sauvegardés
    // Vous pouvez utiliser une boucle pour créer des éléments d'image ou tout autre format que vous souhaitez

    // Exemple simple avec des images
    savedMemesContainer.innerHTML = '';
    savedMemes.forEach((meme, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = meme.url; // Assurez-vous d'avoir une propriété 'url' dans votre objet de mème
        imgElement.alt = `Saved Meme ${index + 1}`;
        imgElement.classList.add('saved-meme-image');
        savedMemesContainer.appendChild(imgElement);
    });
}