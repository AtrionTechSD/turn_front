import { ref } from "vue";

export const rulesClient = ref({
  name: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar un nombre",
      trigger: "blur",
    },
  ],
  lastname: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar el campo apellido",
      trigger: "blur",
    },
  ],
  email: [
    {
      type: "email",
      required: true,
      message: "Debe ingresar el correo electrónico",
      trigger: "blur",
    },
  ],
  address: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar una dirección",
      trigger: "blur",
    },
  ],
  phone: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar el número de teléfono",
      trigger: "blur",
    },
  ],
  institute_id: [
    {
      type: "integer",
      required: true,
      message: "Debe seleccionar una institución",
      trigger: "blur",
    },
  ],
  career_id: [
    {
      type: "integer",
      required: true,
      message: "Debe seleccionar una carrera",
      trigger: "blur",
    },
  ],
});

export const rulesOrder = ref({
  title: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar un título",
      trigger: "blur",
    },
  ],
  description: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar una descripción",
      trigger: "blur",
    },
  ],
  type: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar tipo de pedido",
      trigger: "blur",
    },
  ],
  due_at: [
    {
      type: "date",
      required: true,
      message: "Debe ingresar una fecha de entrega",
      trigger: "blur",
    },
  ],
  price: [
    {
      type: "integer",
      required: true,
      message: "Debe ingresar un precio",
      trigger: "blur",
    },
  ],
  client_id: [
    {
      type: "integer",
      required: true,
      message: "Debe seleccionar un cliente",
      trigger: "blur",
    },
  ],
  tasks: [
    {
      type: "array",
      min: 1,
      message: "Se requiere al menos una tarea",
    },
  ],
});

export const rulesTask = ref({
  title: [
    {
      type: "string",
      required: true,
      message: "Debe ingresar un título",
      trigger: "blur",
    },
  ],
  due_at: [
    {
      type: "date",
      required: true,
      message: "Debe ingresar una fecha de entrega",
      trigger: "blur",
    },
  ],
  status: [
    {
      type: "integer",
      required: true,
      message: "Debe ingresar un estado",
      trigger: "blur",
    },
  ],
});
