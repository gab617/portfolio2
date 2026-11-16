/* eslint-disable react/prop-types */
import { ModalShell } from "./ModalShell";
import { useEffect, useState } from "react";
import { getComponente } from "./componentes";

// Modal tipo "dinamico": monta un componente registrado por nombre.
// datos.componente: nombre en el registro de componentes dinámicos.
// datos.props: props extra para ese componente.
// El componente recibe (props, api) donde api.onResolver(resultado) resuelve.
export function DinamicoModal({ datos = {}, accent, onResolver, onCerrar }) {
  const [Comp, setComp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    if (!datos.componente) {
      setError("Componente no especificado");
      return;
    }
    getComponente(datos.componente).then((c) => {
      if (!activo) return;
      if (!c) setError(`Componente "${datos.componente}" no registrado`);
      else setComp(() => c);
    });
    return () => {
      activo = false;
    };
  }, [datos.componente]);

  return (
    <ModalShell
      titulo={datos.titulo}
      texto={datos.texto}
      imagen={datos.imagen}
      accent={accent}
      accionLabel={datos.accion?.label || "Continuar"}
      onAccion={() => onResolver?.({ tipo: "dinamico" })}
      onCerrar={onCerrar}
    >
      {error && <p className="text-sm text-rose-300">{error}</p>}
      {!error && !Comp && (
        <p className="text-sm text-white/50">Cargando componente…</p>
      )}
      {Comp && (
        <Comp
          {...(datos.props || {})}
          accent={accent}
          onResolver={(resultado) =>
            onResolver?.({ tipo: "dinamico", ...resultado })
          }
        />
      )}
    </ModalShell>
  );
}

export default DinamicoModal;
