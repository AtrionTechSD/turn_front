import alert from "@/plugins/alert";
import { useQuery } from "./queryService";
import { ref, watch } from "vue";
import api from "@/boot/axios";
import confirm from "@/plugins/confirm";
import { useInstitute } from "./InstituteService";
import { useCareer } from "./careerService";
import utils from "@/plugins/utils";
const { institutes, getInstitutes } = useInstitute();
const { careers, getcareers } = useCareer();

const loadInstitutes = async () => {
  await getInstitutes();
  institutes.value = institutes.value.map((r) => ({
    value: r.id,
    label: `${r.sigla}- ${r.name}`,
  }));
};

const loadCareers = async () => {
  await getcareers();
  careers.value = careers.value.map((r) => ({
    value: r.id,
    label: `${r.sigla}- ${r.name}`,
  }));
};

export function useClient() {
  const { params, getParams, methods } = useQuery("clients");
  const pagination = ref({});
  const clients = ref([]);
  const client = ref({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    institute_id: null,
    career_id: null,
  });

  const orderables = ref([
    { key: "name", label: "Nombre" },
    { key: "lastname", label: "Apellidos" },
    { key: "email", label: "Correo" },
    { key: "address", label: "Dirección" },
  ]);

  params.value.include = "image,institute,auth,career,orders.tasks";
  params.value.fields = "id,name,lastname,fullname,email,address,phone";
  params.value.scopes = "onlyClient";

  const getClients = async () => {
    try {
      const {
        data: { content },
      } = await api.get(`/users${getParams()}`);
      clients.value = content.rows;
      pagination.value = { ...content, rows: undefined };
    } catch (error) {
      alert.error(error.message);
    }
  };

  const findClient = async (clientId) => {
    try {
      params.value.fields = "*";
      params.value.scopes = null;
      const {
        data: { content },
      } = await api.get(`/users/${clientId}${getParams()}`);
      client.value = content;
    } catch (error) {
      alert.error(error.message);
    }
  };

  const createClient = async () => {
    try {
      const {
        data: { content },
      } = await api.post(`/users/`, {
        ...client.value,
        phone: utils.formatPhone(client.value.phone),
      });
      alert.success("Cliente registrado exitosamente", 2500);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const updateClient = async (clientId) => {
    try {
      const {
        data: { content },
      } = await api.put(`/users/${clientId}`, {
        ...client.value,
        phone: utils.formatPhone(client.value.phone),
      });
      alert.success("Cliente actualizado exitosamente", 2500);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const {
        data: { content },
      } = await api.delete(`/users/${clientId}`);
      await getClients();
      alert.success("Cliente eliminado");
    } catch (error) {
      alert.error(error.message);
    }
  };

  return {
    clients,
    client,
    getClients,
    createClient,
    updateClient,
    findClient,
    params,
    pagination,
    methods,
    deleteClient,
    orderables,
    loadInstitutes,
    institutes,
    loadCareers,
    careers,
  };
}
