const APIKey = "AIzaSyCIF4HsMcBJxV4mtVu5eNqYfb249buDQzw";
const generatedName = document.querySelector(".generated-name")
const generatedWeight = document.querySelector(".generated-weight")
const generatebtn = document.querySelector("#generate-btn");
const userInput = document.querySelector("#user-input")

function getfonts() {
  return fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${APIKey}`
  ).then((res) => res.json());
}

function randomNumber() {
  return Math.floor(Math.random() * 1631);
}

function onGenerate() {
  let generatedFont
  getfonts().then((res) => {
    generatedFont = res.items[randomNumber()];
    generatedName.textContent = generatedFont.family
    generatedWeight.textContent = generatedFont.variants[0]
    loadfonts(generatedFont.family, generatedFont.files.regular)
    userInput.style.fontFamily = generatedFont.family 
  });
}

generatebtn.addEventListener("click", onGenerate);

async function loadfonts(name, url){
  const importedFont = new FontFace(name, `url(${url})`)
  await importedFont.load()
  document.fonts.add(importedFont)
}
