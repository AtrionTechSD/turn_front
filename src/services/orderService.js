import api from "@/boot/axios";
import { reactive, ref } from "vue";
import { useQuery } from "./queryService";
import alert from "@/plugins/alert";
import { useClient } from "./clientService";
import cloneDeep from "clone-deep";

const { clients, getClients, params } = useClient();

const loadClients = async () => {
  params.value.limit = 1000;
  params.value.order = "name";
  params.value.desc = false;
  await getClients();
  clients.value = clients.value.map((r) => ({
    value: r.id,
    label: r.fullname,
  }));
};
export function useOrder() {
  const orderTypes = [
    "Tarea",
    "Tesis",
    "Monográfico",
    "Tesina",
    "Proyecto",
    "Otro",
  ];
  const { params, getParams, methods } = useQuery("orders");
  const pagination = ref({});
  const order = ref({
    title: "",
    description: "",
    due_at: null,
    status: "Pendiente",
    price: 0,
    client_id: null,
    type: null,
    tasks: [],
  });

  const task = ref({
    title: "",
    due_at: null,
    status: 0,
  });

  const orderables = ref([
    { key: "title", label: "Título" },
    { key: "price", label: "Precio" },
    { key: "description", label: "Descripción" },
    { key: "due_at", label: "F. de Entrega" },
    { key: "status", label: "Estado" },
  ]);
  const orders = ref([]);
  params.value.include = "tasks";
  params.value.fields =
    "id,title,description,due_at,done_at,price,status,type,client_id,left,leftPercent,createdAt,updatedAt";
  const getOrders = async () => {
    try {
      const {
        data: { content },
      } = await api.get(`/orders${getParams()}`);
      orders.value = content.rows;
      pagination.value = { ...content, rows: undefined };
      return content;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createOrder = async () => {
    try {
      const {
        data: { content },
      } = await api.post(`/orders`, order.value);

      alert.success("Nuevo pedido registrado");
      return content;
    } catch (error) {
      console.log(error);
    }
  };

  const addTaskToOrder = () => {
    try {
      const cloneTask = cloneDeep(task.value);
      cloneTask.key = new Date().getSeconds();
      order.value.tasks.push(cloneTask);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTask = (key) => {
    try {
      order.value.tasks = order.value.tasks.filter((tsk) => tsk.key !== key);
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    order,
    task,
    orders,
    getOrders,
    createOrder,
    addTaskToOrder,
    params,
    methods,
    pagination,
    orderables,
    clients,
    loadClients,
    removeTask,
    orderTypes,
  };
}
