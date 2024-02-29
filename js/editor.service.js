
function downloadMeme() {
    const canvas = document.getElementById('editor-canvas');
    const dataUrl = canvas.toDataURL(); 

    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'meme.png';  

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
}
