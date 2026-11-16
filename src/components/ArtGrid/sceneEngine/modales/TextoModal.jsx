/* eslint-disable react/prop-types */
import { useState } from "react";
import { ModalShell } from "./ModalShell";

// Modal tipo "texto": campo de texto a completar.
// datos.campo: { label, placeholder?, multilinea?, requerido? }
export function TextoModal({ datos = {}, accent, onResolver, onCerrar }) {
  const campo = datos.campo || {};
  const [valor, setValor] = useState("");

  const puedeResolver = campo.requerido ? valor.trim().length > 0 : true;

  const resolver = () => {
    if (!puedeResolver) return;
    onResolver?.({ tipo: "texto", valor });
  };

  const comunes =
    "w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-white/40";

  return (
    <ModalShell
      titulo={datos.titulo}
      texto={datos.texto}
      imagen={datos.imagen}
      accent={accent}
      accionLabel={datos.accion?.label || "Enviar"}
      accionDisabled={!puedeResolver}
      onAccion={resolver}
      onCerrar={onCerrar}
    >
      <label className="flex flex-col gap-2">
        {campo.label && (
          <span className="text-sm font-semibold text-white/90">
            {campo.label}
          </span>
        )}
        {campo.multilinea ? (
          <textarea
            rows={4}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder={campo.placeholder || ""}
            className={comunes}
          />
        ) : (
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder={campo.placeholder || ""}
            className={comunes}
          />
        )}
      </label>
    </ModalShell>
  );
}

export default TextoModal;
