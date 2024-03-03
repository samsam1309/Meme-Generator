var canvas = document.getElementById('editor-canvas');
var context = canvas.getContext('2d');  

canvas.addEventListener('mousedown', function(event) {
    handleMouseDown(event, context);  
});
canvas.addEventListener('mousemove', function(event) {
    handleMouseMove(event, context);  
});
canvas.addEventListener('mouseup', function() {
    handleMouseUp(context);  
});

var isDragging = false;
var dragStartX;
var dragStartY;

function handleMouseDown(event, context) {
    var meme = getMeme();
    var canvasRect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - canvasRect.left;
    var mouseY = event.clientY - canvasRect.top;

    for (var i = 0; i < meme.lines.length; i++) {
        var line = meme.lines[i];
        var textWidth = context.measureText(line.txt).width;
        var textHeight = line.size;

        if (
            mouseX >= canvas.width / 2 - textWidth / 2 &&
            mouseX <= canvas.width / 2 + textWidth / 2 &&
            mouseY >= line.yPos &&
            mouseY <= line.yPos + textHeight
        ) {
            isDragging = true;
            dragStartX = mouseX;
            dragStartY = mouseY;
            return;
        }
    }
}

function handleMouseMove(event, context) {
    if (isDragging) {
        var canvasRect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - canvasRect.left;
        var mouseY = event.clientY - canvasRect.top;
        var dragDistanceX = mouseX - dragStartX;
        var dragDistanceY = mouseY - dragStartY;

        var meme = getMeme();
        if (meme.selectedLineIdx !== null && meme.lines[meme.selectedLineIdx]) {
            meme.lines[meme.selectedLineIdx].yPos += dragDistanceY;
        }

        dragStartX = mouseX;
        dragStartY = mouseY;
        renderMeme();
    }
}

function handleMouseUp(context) {
    isDragging = false;
}

function downloadMeme() {
    const dataUrl = canvas.toDataURL();

    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'meme.png';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
}

function shareOnFacebook() {
    const imgDataUrl = canvas.toDataURL('image/jpeg');

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`);
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl);

    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return;
        if (XHR.status !== 200) return console.error('Error uploading image');
        const { responseText: url } = XHR;
        console.log('Got back live url:', url);
        onSuccess(url);
    };
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev);
    };
    XHR.open('POST', '//ca-upload.com/here/upload.php');
    XHR.send(formData);
}