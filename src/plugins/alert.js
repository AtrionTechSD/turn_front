const show = (message = "", options = {}) => {
  const alertElement = document.createElement("div");
  const alertBackDrop = document.createElement("div");

  alertBackDrop.className =
    "fixed top-0 right-0 bottom-0 left-0  bg-gray-700 opacity-40";
  alertBackDrop.style.zIndex = 9999;
  const btnClose = document.createElement("span");
  let { type, position, duration, callback, size } = options;

  message = message.replace(/nl/g, "<br>");
  alertElement.innerHTML = message;
  alertElement.className = `alert pr-6 text-center alert-${
    type || "info"
  } alert-position-${
    position || "top"
  } ${size} flex justify-center items-center`;
  alertElement.style.zIndex = 10000;

  document.body.appendChild(alertElement);
  if (position == "center-middle") {
    document.body.appendChild(alertBackDrop);
  }

  alertElement.classList.add(`alert-slide-in-${position || "top"}`);
  btnClose.className =
    "material-icons-outlined text-sm text-red-400 absolute  right-1 top-1  cursor-pointer";
  btnClose.textContent = "close";
  btnClose.addEventListener("click", () =>
    closeAlert(alertElement, position, 5, callback, alertBackDrop)
  );
  alertElement.appendChild(btnClose);

  closeAlert(alertElement, position, duration, callback, alertBackDrop);
};
const closeAlert = (alertElement, position, duration, callback, backDrop) => {
  setTimeout(() => {
    alertElement.classList.replace(
      `alert-slide-in-${position || "top"}`,
      `alert-slide-out-${position || "top"}`
    );

    setTimeout(() => {
      alertElement.remove();
      backDrop.remove();
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 500); // Duración de la animación de salida
  }, duration || duration);
};

const success = (
  message,
  duration = 5000,
  position = "bottom-right",
  callback,
  size = "size-auto"
) => {
  show(message, {
    type: "success",
    duration: duration,
    position: position,
    callback: callback,
    size: size,
  });
};
const error = (
  message,
  duration = 5000,
  position = "bottom-right",
  callback,
  size = "size-auto"
) => {
  show(message, {
    type: "error",
    duration: duration,
    position: position,
    callback: callback,
    size: size,
  });
};
const warning = (
  message,
  duration = 5000,
  position = "bottom-right",
  callback,
  size = "size-auto"
) => {
  show(message, {
    type: "warning",
    duration: duration,
    position: position,
    callback: callback,
    size: size,
  });
};
const info = (
  message,
  duration = 5000,
  position = "bottom-right",
  callback,
  size = "size-auto"
) => {
  show(message, {
    type: "info",
    duration: duration,
    position: position,
    callback: callback,
    size: size,
  });
};

export default {
  show,
  success,
  error,
  warning,
  info,
};
