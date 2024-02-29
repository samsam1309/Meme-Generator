
function downloadMeme() {
    const canvas = document.getElementById('editor-canvas');
    const dataUrl = canvas.toDataURL(); // Convertir la canvas en une URL de données

    // Créer un élément <a> pour le téléchargement
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'meme.png'; // Nom du fichier à télécharger

    // Ajouter l'élément <a> à la page et déclencher le clic pour démarrer le téléchargement
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Supprimer l'élément <a> après le téléchargement
    document.body.removeChild(downloadLink);
}
