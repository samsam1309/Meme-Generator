function renderMeme(clickedImage) {
    const imagePath = clickedImage.src;
    console.log("Image clicked, rendering meme:", imagePath);

    // Mettre à jour l'image sélectionnée dans le meme
    setSelectedImage(getImageId(clickedImage));

    // Récupérer la référence vers la canvas et son contexte
    const canvas = document.getElementById('editor-canvas');
    const ctx = canvas.getContext('2d');

    // Créer une nouvelle image
    const img = new Image();

    // Définir la source de l'image sur le chemin cliqué
    img.src = imagePath;

    // Attendre que l'image soit chargée avant de la dessiner
    img.onload = function () {
        // Dessiner l'image sur la canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Appeler la fonction toggleMode pour afficher l'éditeur
        toggleMode('editor');
    };
}

function getImageId(clickedImage) {
    // Récupérer le parent (la div contenant les images)
    const imageGallery = document.querySelector('.image-gallery');

    // Trouver l'index de l'image cliquée parmi les enfants de la galerie
    const imageIndex = Array.from(imageGallery.children).indexOf(clickedImage);

    return imageIndex;
}
