// Muestra el loader con un mensaje
function showLoad(message) {
  stopLoad();
  const loader = document.createElement("section");
  const container = document.createElement("div");
  const icon = document.createElement("div");
  const text = document.createElement("h2");

  loader.classList.add("loader");
  loader.id = "loader";
  container.classList.add("loader-container");

  icon.classList.add("loader-icon");

  text.classList.add("loader-text");

  text.textContent = message;

  container.appendChild(icon);
  container.appendChild(text);

  loader.appendChild(container);
  document.body.appendChild(loader);
}

// Cierra y elimina el loader
function stopLoad() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}

// Exportamos las funciones
const loader = { showLoad, stopLoad };

export default loader;
