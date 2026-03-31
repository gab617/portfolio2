import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeSelector } from "../ThemeSelector";
import { Context } from "../../Context/Context";

const navItems = [
  { path: "/", label: "Inicio", hash: "#inicio" },
  { path: "/projects", label: "Proyectos", hash: "#proyectos" },
  { path: "/api-tester", label: "APIs", hash: "" },
  { path: "/cv", label: "CV", hash: "" },
  { path: "/contact", label: "Contacto", hash: "#contacto" },
];

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme } = useContext(Context);
  
  const isDark = currentTheme?.color !== "#000";
  const textColor = isDark ? "#fff" : "#000";
  const bgColor = isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)";

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img 
            className="w-10 h-10 rounded-full border-2 border-teal-400" 
            src="logo.webp" 
            alt="Gabriel Cabrera" 
          />
          <span className="hidden sm:block font-bold text-teal-400">
            Gabriel Cabrera
          </span>
        </Link>

        <button 
          className="md:hidden p-2"
          style={{ color: textColor }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul className={`md:flex items-center gap-1 sm:gap-2 ${isMenuOpen ? 'absolute top-full left-0 right-0 flex flex-col p-4' : 'hidden'}`}
            style={{ backgroundColor: bgColor }}>
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              {item.hash && isHome ? (
                <a
                  href={item.hash}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded text-sm hover:bg-teal-500/30 transition-colors"
                  style={{ color: textColor }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded text-sm transition-colors ${
                    location.pathname === item.path
                      ? "bg-teal-500/50 text-white"
                      : "hover:bg-teal-500/30"
                  }`}
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="mt-2 md:mt-0 md:ml-2">
            <ThemeSelector />
          </li>
        </ul>
      </nav>
    </header>
  );
}
