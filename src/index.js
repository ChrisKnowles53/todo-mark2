function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "ebpack Up and Running from index.js";

  return element;
}

document.body.appendChild(component());
