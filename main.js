const APIKey = "AIzaSyCIF4HsMcBJxV4mtVu5eNqYfb249buDQzw";
const generatedName = document.querySelector(".generated-name");
const generatedWeight = document.querySelector(".generated-weight");
const generateBtn = document.querySelector("#generate-btn");
const userInput = document.querySelector("#user-input");
const dashboard = document.querySelector(".dashboard");
const backBtn = document.querySelector("#back-btn")
const getFontBtn = document.querySelector("#getfont-btn")
let fontList = [];

function getfonts() {
  return fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${APIKey}`
  ).then((res) => res.json());
}

function randomNumber() {
  return Math.floor(Math.random() * 1631);
}

function fontGenerate() {
  getfonts().then((res) => {
    let generatedFont = res.items[randomNumber()]
    updateHtml(generatedFont)
    fontList.push(generatedFont)
});
}

async function loadfonts(name, url) {
  const importedFont = new FontFace(name, `url(${url})`);
  await importedFont.load();
  document.fonts.add(importedFont);
}

function updateHtml(font) {
  generatedName.textContent = font.family;
  generatedWeight.textContent = font.variants[0];
  loadfonts(font.family, font.files.regular);
  userInput.style.fontFamily = font.family;
  getFontBtn.setAttribute("href", `https://fonts.google.com/specimen/${font.family}`)
}

function fontBack() {
  if (fontList.length === 1) return
  updateHtml(fontList[fontList.length - 2])
  fontList.pop()
}

generateBtn.addEventListener("click", fontGenerate);
backBtn.addEventListener("click", fontBack)

userInput.addEventListener("input", () => {
  if (userInput.value !== "") {
    userInput.style.textAlign = "center";
    userInput.style.width = "100%";
    dashboard.classList.add("dashboard--show");
  } else {
    userInput.removeAttribute("style");
  }
});

fontGenerate();
