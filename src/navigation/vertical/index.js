import { File, Layers, Square, UserCheck } from "react-feather";

export default [
  {
    id: "Examen",
    title: "Examen",
    icon: <File size={20} />,
    navLink: "/examen",
  },
  {
    id: "Lote",
    title: "Lote",
    icon: <Layers size={20} />,
    navLink: "/lote",
  },
  {
    id: "Tipo",
    title: "Tipo",
    icon: <Square size={20} />,
    navLink: "/tipo",
  },
  {
    id: "Usuarios",
    title: "Usuarios",
    icon: <UserCheck size={20} />,
    navLink: "/usuarios",
  }
];

