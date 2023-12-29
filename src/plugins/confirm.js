// confirm.js

function confirm(message, callback) {
  // Crear los elementos del DOM para la confirmación
  return new Promise((resolve) => {
    const confirmOverlay = document.createElement("div");
    confirmOverlay.id = "confirmOverlay";

    const confirmBox = document.createElement("div");
    confirmBox.id = "confirmBox";

    const confirmMessage = document.createElement("h1");
    confirmMessage.id = "confirmMessage";
    confirmMessage.textContent = message;

    const confirmButtons = document.createElement("div");
    confirmButtons.id = "confirmButtons";

    const yesButton = document.createElement("button");
    yesButton.id = "yesButton";
    yesButton.textContent = "Aceptar";

    const noButton = document.createElement("button");
    noButton.id = "noButton";
    noButton.textContent = "Cancelar";

    // Agregar los elementos al DOM
    confirmButtons.appendChild(yesButton);
    confirmButtons.appendChild(noButton);

    confirmBox.appendChild(confirmMessage);
    confirmBox.appendChild(confirmButtons);

    confirmOverlay.appendChild(confirmBox);
    document.body.appendChild(confirmOverlay);

    // Eventos de los botones
    yesButton.addEventListener("click", () => {
      document.body.removeChild(confirmOverlay);
      const res = callback();
      resolve(res || true);
    });

    noButton.addEventListener("click", () => {
      document.body.removeChild(confirmOverlay);
      resolve(false);
    });
  });
}

export default confirm;
