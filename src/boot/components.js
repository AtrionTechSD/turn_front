import TButton from "@/components/global/TButton.vue";
import TInput from "@/components/global/TInput.vue";
import TToggle from "@/components/global/TToggle.vue";
import TModal from "@/components/global/TModal.vue";
import TSelect from "@/components/global/TSelect.vue";
import { useGlobalStore } from "@/stores/gobalStore";
import { useAuthStore } from "@/stores/authStore";

export default function (app) {
  app.component("TButton", TButton);
  app.component("TInput", TInput);
  app.component("TToggle", TToggle);
  app.component("TModal", TModal);
  app.component("TSelect", TSelect);
  app.config.globalProperties.$global = useGlobalStore();
  app.config.globalProperties.$auth = useAuthStore();
}
