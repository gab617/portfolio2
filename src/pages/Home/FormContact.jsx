import { useState, useContext } from "react";
import { Context } from "../../Context/Context";

const STORAGE_KEY = "nwPortf_mails_enviados";

// Recuperar mails enviados desde localStorage
const getMailsEnviados = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const data = JSON.parse(0);
    // Limpiar entradas viejas (> 24h)
    const ahora = Date.now();
    const vigentes = data.filter((d) => ahora - d.ts < 24 * 60 * 60 * 1000);
    if (vigentes.length !== data.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vigentes));
    }
    return vigentes;
  } catch {
    return [];
  }
};

const guardarMailEnviado = () => {
  const actuales = getMailsEnviados();
  actuales.push({ ts: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actuales));
};

export function FormContact() {
  const { currentTheme } = useContext(Context);
  const isDark = currentTheme.color === "#fff";

  const initialFormValues = {
    name: "",
    email: "",
    reason: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Mails enviados desde localStorage (persiste entre recargas)
  const [mailsEnviados, setMailsEnviados] = useState(getMailsEnviados);
  const mailsRestantes = 3 - mailsEnviados.length;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(""); // limpiar error al escribir
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg("");

    const formData = {
      name: formValues.name,
      addresse: formValues.email,
      subject: formValues.reason,
      message: formValues.message,
    };

    // Validar campos
    const emptyField = Object.entries(formData).find(
      ([key, value]) => value.trim() === ""
    );
    if (emptyField) {
      const labels = { name: "Nombre", addresse: "Email", subject: "Asunto", message: "Mensaje" };
      setErrorMsg(`❌ Completá ${labels[emptyField[0]]}`);
      return;
    }

    sendEmail(formData);
  };

  function sendEmail(form) {
    setLoadingEmail(true);

    fetch("https://serviciosunificados.onrender.com/cnt/enviar-correo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.text())
      .then(() => {
        guardarMailEnviado();
        setMailsEnviados(getMailsEnviados());
        setLoadingEmail(false);
        setFormValues(initialFormValues);
        setEmailEnviado(true);
        setTimeout(() => setEmailEnviado(false), 4000);
      })
      .catch(() => {
        setLoadingEmail(false);
        setErrorMsg("❌ Error al enviar. Intentalo de nuevo.");
      });
  }

  return (
    <section
      id="contacto"
      className="max-w-2xl mx-auto px-4 py-10"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
          📬 Contacto
        </span>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Trabajemos juntos
        </h1>
        <p className="text-sm mt-2" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
          Contame tu idea y te respondo a la brevedad
        </p>
      </div>

      <div
        className="rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

        {/* Contador de mensajes */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${mailsRestantes > 0 ? "bg-teal-500" : "bg-red-500"}`} />
            
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i <= mailsEnviados.length
                    ? "bg-teal-500/40"
                    : "bg-teal-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid nombre + asunto */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6b7280" }}>
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6b7280" }}>
                Asunto
              </label>
              <input
                type="text"
                name="reason"
                value={formValues.reason}
                onChange={handleChange}
                placeholder="Motivo del contacto"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#6b7280" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#6b7280" }}>
              Mensaje
            </label>
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleChange}
              placeholder="Escribí tu mensaje..."
              rows={4}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 resize-none ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'}`}
            />
          </div>

          {/* Errores */}
          {errorMsg && (
            <div className="text-sm px-3 py-2 rounded-lg bg-red-500/10 text-red-500 text-center">
              {errorMsg}
            </div>
          )}

          {/* Botón enviar */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loadingEmail}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5"
            >
              {loadingEmail ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </div>
        </form>

        {/* Animación de enviado */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className={`transition-all duration-500 ${
              emailEnviado
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            <div className="bg-teal-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Mensaje enviado!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Redes */}
      <div className="flex justify-center gap-4 mt-6">
        <a
          href="https://github.com/gab617?tab=repositories"
          target="_blank"
          className="p-2 rounded-lg transition-all hover:-translate-y-0.5 opacity-70 hover:opacity-100"
        >
          <img src="icons_tecs/github-logo.png" className="w-6 h-6" alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/gabriel-cabrera-sirlopu-0a5700267/"
          target="_blank"
          className="p-2 rounded-lg transition-all hover:-translate-y-0.5 opacity-70 hover:opacity-100"
        >
          <img src="linkedin-icon.png" className="w-6 h-6" alt="LinkedIn" />
        </a>
      </div>
    </section>
  );
}
