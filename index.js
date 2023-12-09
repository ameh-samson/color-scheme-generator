// gets the required element from the HTML

const colorPicker = document.querySelector("#color-picker");
const selectMode = document.querySelector("#select-mode");
const form = document.querySelector(".form");
const colorsDivContainer = document.querySelector(".colors-div-container");
const hexCodesContainer = document.querySelector(".hex-codes-container");

// listen to a submit event from the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateColorScheme();
});

// generates the color scheme
function generateColorScheme() {
  const colorSelected = colorPicker.value;
  const modeSelected = selectMode.value;

  // encodeURIComponent ensures that the values are propeprly encoded which makes the URL safe and correctly formatted for an API request
  const encodedColor = encodeURIComponent(colorSelected);
  const encodedMode = encodeURIComponent(modeSelected);

  // fetches the colorScheme from the color API with GET method
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${encodedColor}&mode=${encodedMode}&count=5`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((data) => {
      renderColorScheme(data); // calls the function that renders the color to the DOM with the the data return passed into it
      renderHexCode(data); // calls the function that renders the hexCode of the color to the DOM
    });
}

function renderColorScheme(data) {
  colorsDivContainer.innerHTML = "";

  // loops through the colors
  data.colors.forEach((color) => {
    colorsDivContainer.innerHTML += `
      <div class="colors-div" style="background-color: ${color.hex.value};"></div>
      `;
  });
}

// renders the hex code to the DOM
function renderHexCode(data) {
  hexCodesContainer.innerHTML = "";

  // loops through the hex values
  data.colors.forEach((color) => {
    hexCodesContainer.innerHTML += `
      <P>${color.hex.value}</P>
    `;
  });
}
