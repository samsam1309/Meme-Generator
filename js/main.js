var currentMode = 'gallery';

function toggleMode(mode) {
    // Masquer tous les éléments par défaut
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('editor-container').style.display = 'none';

    // Afficher le contenu en fonction du mode sélectionné
    if (mode === 'gallery') {
        document.getElementById('gallery').style.display = 'flex';
        currentMode = 'gallery';
    } else if (mode === 'editor') {
        document.getElementById('editor-container').style.display = 'flex';
        currentMode = 'editor';
    }
}