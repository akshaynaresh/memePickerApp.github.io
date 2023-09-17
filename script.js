import { catsData } from "./data.js";

const emotionsRadiosEl = document.getElementById("emotion-radios");
const getImagesBtn = document.querySelector("button#get-image-btn");
const gifsOnlyOption = document.querySelector('input#gifs-only-option');
const memeModal = document.querySelector('div#meme-modal');
const memeModalImg = document.querySelector('div#meme-modal-inner');    
const closeMemeModalBtn = document.querySelector('button#meme-modal-close-btn');                              


// highlights the selected radio option
emotionsRadiosEl.addEventListener("change", highlightCheckedOption);


// renders the cat image to the dom when the button is clicked
getImagesBtn.addEventListener("click", renderCat);


// function to highlight the selected radio option
function highlightCheckedOption(event) {
    const radioArray = document.getElementsByClassName('radio')
    for (let radio of radioArray) {
        radio.classList.remove('highlight')
    }
    document.getElementById(event.target.id).parentElement.classList.add('highlight')
}


// returns an array of all the emotions in the catsData array and renders them to the dom
function getEmotionsArray(cats){
    const cat = [];
    for (let catData of cats) {
        for (let emotion of catData.emotionTags) {
            if(!(cat.includes(emotion))) {
                cat.push(emotion);
            }
        }
    }
    return cat;
}


// renders the emotions to the dom
function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats);
    let listEmotions = ``;
    for (let emotion of emotions) {
        listEmotions += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" name="emotion" value="${emotion}">
        </div>
        `
    }
    emotionsRadiosEl.innerHTML = listEmotions;
}
renderEmotionsRadios(catsData);


// returns an array of objects that matches the user's criteria
function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')) {
        const radios = document.querySelector('input[type="radio"]:checked');
        const isGif = gifsOnlyOption.checked;
        const isCat = catsData.filter(function(cats) {
            if(isGif) { 
                return cats.emotionTags.includes(radios.value) && cats.isGif;
            }
            else { 
                return cats.emotionTags.includes(radios.value)
            }
        })
        return isCat;
    }
}


// returns a single cat object selected from the array provided by getMatchingCatsArray()
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1) {
        return catsArray[0];
    }
    else {
        const randomCat = catsArray[Math.floor(Math.random() * catsArray.length)];
        return randomCat;
    }
}


// uses the cat object provided by getSingleCatObject() to create a HTML string which will render it to the dom
function renderCat() {
    const catObject = getSingleCatObject();
    memeModalImg.innerHTML = `
        <img
            src="./images/${catObject.image}" 
            alt="${catObject.alt}" 
            class="cat-img" 
        >
    `
    memeModal.style.display = "flex";
}


// closes the modal when the close button is clicked
closeMemeModalBtn.addEventListener("click", function() {
    memeModal.style.display = "none";
})
