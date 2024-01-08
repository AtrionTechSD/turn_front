import TButton from "@/components/global/TButton.vue";
import TInput from "@/components/global/TInput.vue";
import TToggle from "@/components/global/TToggle.vue";
import TModal from "@/components/global/TModal.vue";
import TSelect from "@/components/global/TSelect.vue";
import TIcon from "@/components/global/TIcon.vue";
import TFilter from "@/components/global/TFilter.vue";
import TPagination from "@/components/global/TPagination.vue";
import ElementPlus from "element-plus";

import { useGlobalStore } from "@/stores/gobalStore";
import { useAuthStore } from "@/stores/authStore";

export default function (app) {
  app.component("TButton", TButton);
  app.component("TInput", TInput);
  app.component("TToggle", TToggle);
  app.component("TModal", TModal);
  app.component("TSelect", TSelect);
  app.component("TIcon", TIcon);
  app.component("TFilter", TFilter);
  app.component("TPagination", TPagination);
  app.use(ElementPlus);
  app.config.globalProperties.$global = useGlobalStore();
  app.config.globalProperties.$auth = useAuthStore();
}
