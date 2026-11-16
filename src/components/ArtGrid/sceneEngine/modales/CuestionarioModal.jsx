/* eslint-disable react/prop-types */
import { useState } from "react";
import { ModalShell } from "./ModalShell";

// Modal tipo "cuestionario": una o más preguntas con opciones.
// datos.preguntas: [{ id, label, opciones:[{valor,label}], multiple? }]
// datos.requerirCorrectas: si true, exige acertar (opcion.correcta) para resolver.
export function CuestionarioModal({ datos = {}, accent, onResolver, onCerrar }) {
  const preguntas = datos.preguntas || [];
  const [respuestas, setRespuestas] = useState({});

  const setRespuesta = (pregunta, valor) => {
    setRespuestas((prev) => {
      const actual = prev[pregunta.id];
      if (pregunta.multiple) {
        const arr = Array.isArray(actual) ? actual : [];
        const next = arr.includes(valor)
          ? arr.filter((v) => v !== valor)
          : [...arr, valor];
        return { ...prev, [pregunta.id]: next };
      }
      return { ...prev, [pregunta.id]: valor };
    });
  };

  const respondida = (p) => {
    const r = respuestas[p.id];
    return p.multiple ? Array.isArray(r) && r.length > 0 : r != null;
  };

  const todasRespondidas = preguntas.every(respondida);

  const acertoTodo = () => {
    if (!datos.requerirCorrectas) return true;
    return preguntas.every((p) => {
      const r = respuestas[p.id];
      const correctas = (p.opciones || [])
        .filter((o) => o.correcta)
        .map((o) => o.valor);
      if (p.multiple) {
        const arr = Array.isArray(r) ? [...r].sort() : [];
        const exp = [...correctas].sort();
        return arr.length === exp.length && arr.every((v, i) => v === exp[i]);
      }
      return correctas.includes(r);
    });
  };

  const puedeResolver = todasRespondidas && acertoTodo();

  const resolver = () => {
    if (!puedeResolver) return;
    onResolver?.({ tipo: "cuestionario", respuestas });
  };

  return (
    <ModalShell
      titulo={datos.titulo}
      texto={datos.texto}
      imagen={datos.imagen}
      accent={accent}
      accionLabel={datos.accion?.label || "Responder"}
      accionDisabled={!puedeResolver}
      onAccion={resolver}
      onCerrar={onCerrar}
    >
      <div className="flex flex-col gap-5">
        {preguntas.map((p) => (
          <fieldset key={p.id} className="flex flex-col gap-2">
            <legend className="mb-1 text-sm font-semibold text-white/90">
              {p.label}
            </legend>
            {(p.opciones || []).map((o) => {
              const r = respuestas[p.id];
              const marcada = p.multiple
                ? Array.isArray(r) && r.includes(o.valor)
                : r === o.valor;
              return (
                <label
                  key={o.valor}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                    marcada
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                  }`}
                >
                  <input
                    type={p.multiple ? "checkbox" : "radio"}
                    name={p.id}
                    checked={marcada}
                    onChange={() => setRespuesta(p, o.valor)}
                    className="h-4 w-4"
                    style={{ accentColor: accent }}
                  />
                  <span className="text-white/90">{o.label}</span>
                </label>
              );
            })}
          </fieldset>
        ))}
        {datos.requerirCorrectas && todasRespondidas && !acertoTodo() && (
          <p className="text-xs font-medium text-rose-300">
            Hay respuestas incorrectas. Revisá e intentá de nuevo.
          </p>
        )}
      </div>
    </ModalShell>
  );
}

export default CuestionarioModal;
