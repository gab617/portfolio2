/* eslint-disable react/prop-types */
import { ModalShell } from "./ModalShell";

// Modal tipo "textoPlano": sólo muestra texto de lectura (e imagen opcional).
export function TextoPlanoModal({ datos = {}, accent, onResolver, onCerrar }) {
  const resolver = () => onResolver?.({ tipo: "textoPlano" });

  return (
    <ModalShell
      titulo={datos.titulo}
      imagen={datos.imagen}
      accent={accent}
      accionLabel={datos.accion?.label || "Entendido"}
      onAccion={resolver}
      onCerrar={onCerrar}
    >
      <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">
        {datos.texto}
      </p>
    </ModalShell>
  );
}

export default TextoPlanoModal;
