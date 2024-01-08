import api from "@/boot/axios";
import router from "@/routes";
import { useAuthStore } from "@/stores/authStore";
import jsCookie from "js-cookie";
import { ElMessageBox } from "element-plus";

export default {
  formatPhone: (number) => {
    var cleaned = ("" + number).replace(/\D/g, "");
    var length = cleaned.length;
    if (length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (length <= 11) {
      return (
        "+" +
        cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
      );
    } else if (length <= 12) {
      return (
        "+" + cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
      );
    } else {
      return "+" + cleaned;
    }
  },
  setCookies: (key, value, expires) => {
    jsCookie.set(key, value, { expires });
  },

  getSavedParams: (schema) => {
    let prevParams = jsCookie.get(`${schema}Params`);
    let page = 1;
    let perpage = 10;
    if (prevParams) {
      prevParams = JSON.parse(prevParams);
      page = prevParams.currentPage || 10;
      perpage = prevParams.pageSize || 1;
    }

    return { page, perpage };
  },

  checkNoFoundedResource: (value) => {
    if (!value) {
      ElMessageBox.alert(
        "El recurso solicitado no está disponible",
        "Lo sentimos",
        {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: "OK",
          callback: () => {
            router.replace("/admin");
          },
        }
      );
    }
  },

  toHourAndDay: (value) => {
    const toHours = value * 24;
    const days = Math.floor(toHours / 24);
    const hours = Math.round(toHours % 24);
    return `${days}d ${hours} hrs.`;
  },

  statusBar: (percentage) => {
    if (percentage < 25) return "exception";
    if (percentage < 50) return "warning";
    if (percentage < 75) return "";
    return "success";
  },
  formatMoney: (number) => {
    number = parseFloat(number);
    if (isNaN(number)) {
      return "$" + "0";
    }
    return "$" + number.toLocaleString("en-US");
  },
  sendToCloud: async (image) => {
    try {
      const url = "https://api.cloudinary.com/v1_1/atriontechsd/image/upload";
      const {
        data: { content },
      } = await api.get("/app/cloudinary/signature");
      console.log(content);
      const formData = new FormData();
      formData.append("api_key", content.api_key);
      formData.append("eager", "w_400,h_300,c_fill");
      formData.append("file", image);
      formData.append("public_id", `profile${useAuthStore().user?.id}`);
      formData.append("timestamp", content.timestamp.toString());
      formData.append("signature", content.signature);
      formData.append("upload_preset", "oucbxfou");

      return fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => data.secure_url)
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      alert.error(error.message);
    }
  },
};
