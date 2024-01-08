// confirm.js

function confirm(message, callback) {
  // Crear los elementos del DOM para la confirmación
  return new Promise((resolve) => {
    const prevOverlay = document.getElementById("confirmOverlay");
    if (prevOverlay) {
      return;
    }
    const confirmOverlay = document.createElement("div");
    confirmOverlay.id = "confirmOverlay";

    const confirmBox = document.createElement("div");
    confirmBox.id = "confirmBox";
    confirmBox.classList.add("confirm-show");

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

    document.body.appendChild(confirmOverlay);
    confirmOverlay.appendChild(confirmBox);

    // Eventos de los botones
    yesButton.addEventListener("click", () => {
      closeConfirm();
      const res = callback();
      resolve(res || true);
    });

    noButton.addEventListener("click", () => {
      closeConfirm();
      resolve(false);
    });
    const closeConfirm = () => {
      confirmBox.classList.replace(`confirm-show`, `confirm-hide`);
      setTimeout(() => {
        confirmOverlay.remove();
      }, 700); // Duración de la animación de salida
    };
  });
}

export default confirm;
