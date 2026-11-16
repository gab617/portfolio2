/* eslint-disable react/prop-types */
import { ModalShell } from "./ModalShell";

// Modal tipo "imagen": sólo muestra una imagen (y texto opcional).
// datos.imagen (requerido), datos.accion?: { label }
export function ImagenModal({ datos = {}, accent, onResolver, onCerrar }) {
  const resolver = () => {
    onResolver?.({ tipo: "imagen", accion: datos.accion?.label || "Continuar" });
  };

  return (
    <ModalShell
      titulo={datos.titulo}
      texto={datos.texto}
      imagen={datos.imagen}
      accent={accent}
      accionLabel={datos.accion?.label || "Continuar"}
      onAccion={resolver}
      onCerrar={onCerrar}
    >
      {!datos.imagen && (
        <p className="text-sm text-white/50">(sin imagen definida)</p>
      )}
    </ModalShell>
  );
}

export default ImagenModal;
