const form = document.querySelector(".form");
const colorPicker = document.querySelector("#color-picker");
const selectMode = document.querySelector("#select-mode");
const generateBtn = document.querySelector("#generateBtn");
const colorsDivContainer = document.querySelector(".colors-div-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateColorScheme();
});

function generateColorScheme() {
  const colorSelected = colorPicker.value;
  const modeSelected = selectMode.value;
  const encodedColor = encodeURIComponent(colorSelected);
  const encodedMode = encodeURIComponent(modeSelected);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${encodedColor}&mode=${encodedMode}&count=5`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((data) => {
      displayColorScheme(data);
    });
}

function displayColorScheme(data) {
  colorsDivContainer.innerHTML = "";
  data.colors.forEach((color) => {
    colorsDivContainer.innerHTML += `
      <div class="colors-div" style="background-color: ${color.hex.value};"></div>
      `;
  });

  const colorsDiv = document.querySelectorAll(".colors-div");
  colorsDiv.forEach((colorDiv) => {
    colorDiv.addEventListener("click", () => {
      const hexCode = colorsDiv.style.backgroundColor;
      copyHexCodeToClipboard(hexCode);
      alert(`Hex code "${hexCode}" copied to clipboard!`);
    });
  });
}

function copyHexCodeToClipboard(hexCode) {
  const textarea = document.createElement("textarea");
  textarea.value = hexCode;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
