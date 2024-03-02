"use strict";

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'humor'] },
    { id: 2, url: 'img/2.jpg', keywords: ['meme', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['humor', 'baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['humor', 'baby', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'meme', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['humor', 'meme'] },
    { id: 7, url: 'img/7.jpg', keywords: ['humor', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['humor', 'funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['humor', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['humor', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['humor', 'funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['humor', 'funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['humor', 'funny'] },
    { id: 15, url: 'img/15.jpg', keywords: ['humor', 'funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['humor', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['humor', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['humor', 'baby'] },
];


var gKeywords = {
    'funny': 4,
    'cat': 2,
    'meme': 3,
    'dog': 2,
    'humor': 3,
    'baby': 2
};

function filterImages() {
    var searchBar = document.getElementById('search-bar');
    var filterValue = searchBar.value.toLowerCase();

    var filteredImages = gImgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.toLowerCase().includes(filterValue);
        });
    });

    displayFilteredImages(filteredImages);
}

function displayFilteredImages(images) {
    var gallery = document.querySelector('.image-gallery');
    gallery.innerHTML = ''; 

    images.forEach(function (img) {
        var imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = 'Gallery Image';
        imgElement.classList.add('gallery-image');
        imgElement.onclick = function () {
            selectImage(img.id);
        };

        gallery.appendChild(imgElement);
    });
}

var searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', filterImages);


function renderKeywords() {
    var keywordContainer = document.getElementById('keyword-container');
    keywordContainer.innerHTML = '';

    Object.keys(gKeywords).forEach(function (keyword) {
        var keywordElement = document.createElement('span');
        keywordElement.textContent = keyword;
        keywordElement.classList.add('keyword');
        keywordElement.style.fontSize = gKeywords[keyword] + 'em';
        keywordElement.onclick = function () {
            increaseKeywordSize(keyword);
        };

        keywordContainer.appendChild(keywordElement);
    });
}

function increaseKeywordSize(keyword) {
    gKeywords[keyword] += 0.1;
    renderKeywords();
}

renderKeywords();


function filterImages() {
    var searchBar = document.getElementById('search-bar');
    var filterValue = searchBar.value.toLowerCase();

    var filteredImages = gImgs.filter(function (img) {
        return img.keywords.some(function (keyword) {
            return keyword.toLowerCase().includes(filterValue);
        });
    });

    displayFilteredImages(filteredImages);
}

function displayFilteredImages(images) {
    var gallery = document.querySelector('.image-gallery');
    gallery.innerHTML = ''; 

    images.forEach(function (img) {
        var imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = 'Gallery Image';
        imgElement.classList.add('gallery-image');
        imgElement.onclick = function () {
            selectImage(img.id);
        };

        gallery.appendChild(imgElement);
    });
}

var searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', filterImages);

function saveMeme() {
    var savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];
    var memeToSave = JSON.parse(JSON.stringify(gMeme)); 

    memeToSave.timestamp = Date.now();

    savedMemes.push(memeToSave);
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));

    loadSavedMemes();
}

function loadSavedMemes() {
    var savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];
    var savedMemesSection = document.getElementById('saved-memes');

    savedMemesSection.innerHTML = '';

    savedMemes.forEach(function (savedMeme, index) {
        var memeContainer = document.createElement('div');
        memeContainer.classList.add('saved-meme-container');

        var memeImage = document.createElement('img');
        memeImage.src = 'img/' + savedMeme.selectedImgId + '.jpg';
        memeImage.alt = 'Saved Meme Image';

        memeContainer.appendChild(memeImage);

        savedMeme.lines.forEach(function (line) {
            var textElement = document.createElement('p');
            textElement.textContent = line.txt;
            memeContainer.appendChild(textElement);
        });

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            editSavedMeme(index);
        });

        memeContainer.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteSavedMeme(index);
        });

        memeContainer.appendChild(deleteButton);

        savedMemesSection.appendChild(memeContainer);
    });
}



function editSavedMeme(index) {
    var savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];
    var savedMeme = savedMemes[index];

    gMeme = JSON.parse(JSON.stringify(savedMeme));

    toggleMode('editor');
    renderMeme();
}

function deleteSavedMeme(index) {
    var savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || [];

    if (index >= 0 && index < savedMemes.length) {
        savedMemes.splice(index, 1);

        localStorage.setItem('savedMemes', JSON.stringify(savedMemes));

        loadSavedMemes();
    }
}
