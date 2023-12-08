fetch("https://www.thecolorapi.com/")
  .then((res) => res.json())
  .then((color) => console.log(color));
