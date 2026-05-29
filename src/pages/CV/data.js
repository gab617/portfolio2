import { CurricVitae as GabrielCv } from "./documentos/Gabriel";
import { CurricVitae as AugustoCv } from "./documentos/Augusto";
import { CurricVitae as CarlosCv } from "./documentos/Carlos";
import { CurricVitae as AgusBellomoCv } from "./documentos/AgusBellomo";

const cvData = [
  {
    id: "gabriel",
    label: "Gabriel",
    Component: GabrielCv,
  },
  {
    id: "augusto",
    label: "Augusto",
    Component: AugustoCv,
  },
  {
    id: "carlos",
    label: "Carlos Quiroga",
    Component: CarlosCv,
  },
  {
    id: "Agustina",
    label: "Agus Bellomo",
    Component: AgusBellomoCv,
  },
];

export default cvData;
