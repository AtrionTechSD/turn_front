const show = (message, options = {}) => {
  const alertElement = document.createElement("div");
  const { type, position, duration } = options;

  alertElement.textContent = message;
  alertElement.className = `alert alert-${type || "info"} alert-position-${
    position || "top"
  }`;

  document.body.appendChild(alertElement);

  alertElement.classList.add(`alert-slide-in-${position || "top"}`);

  setTimeout(() => {
    // Cambiar a la clase de animación de salida después de un tiempo
    alertElement.classList.replace(
      `alert-slide-in-${position || "top"}`,
      `alert-slide-out-${position || "top"}`
    );

    setTimeout(() => {
      alertElement.remove();
    }, 500); // Duración de la animación de salida
  }, duration || duration);
};

const success = (message, duration = 5000, position = "top") => {
  show(message, {
    type: "success",
    duration: duration,
    position: position,
  });
};
const error = (message, duration = 5000, position = "top") => {
  show(message, {
    type: "error",
    duration: duration,
    position: position,
  });
};
const warning = (message, duration = 5000, position = "top") => {
  show(message, {
    type: "warning",
    duration: duration,
    position: position,
  });
};
const info = (message, duration = 5000, position = "top") => {
  show(message, {
    type: "info",
    duration: duration,
    position: position,
  });
};

export default {
  show,
  success,
  error,
  warning,
  info,
};
