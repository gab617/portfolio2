
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

const images = [
  { src: "./promos/1.jpeg", position: "center" },
  { src: "./promos/2.jpeg", position: "center" },
  { src: "./promos/3.jpeg", position: "center" },
];

const Img = ({ index, className = "" }) => (
  <img 
    src={images[index].src} 
    className={`object-cover ${className}`}
    style={{ objectPosition: images[index].position }}
  />
);

const initialEventInfo = {
  title: "EXOTIC NIGHT",
  date: "31 MAYO",
  place: "FANGO",
  price: "$12.000",
};

const variants = [
  { name: "Horizonte", description: "Línea de horizonte con cielo dramático" },
  { name: "Mosaico Deluxe", description: "Mosaico de lujo con marcos dorados" },
  { name: "Onda Sonora", description: "Ondas de sonido visuales" },
  { name: "Caleidoscopio", description: "Efecto caleidoscopio especular" },
  { name: "Portal", description: "Efecto portal dimensional" },
  { name: "Collage乱", description: "Collage asimétrico dinámico" },
  { name: "Espejismo", description: "Reflejos múltiples especulares" },
  { name: "Cuántico", description: "Efecto量子de superposición" },
  { name: "Néon Drift", description: "Neon con efecto motion blur" },
  { name: "Celestial", description: "Cuerpos celestes y partículas" },
  { name: "Glitch Art", description: "Glitch digital artístico" },
  { name: "Bruma", description: "Niebla y misterio" },
  { name: "Bohemio", description: "Estilo bohemio artesanal" },
  { name: "Cine XS", description: "Strip de película cinematográfica" },
  { name: "Acuarela", description: "Efectoacuarela artístico" },
];

function Variant1({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[45%]">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/40 via-purple-600/20 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div className="absolute top-[45%] left-0 w-full h-[55%]">
          <Img index={1} className="w-full h-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>
      </div>
      
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-56">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl" />
        <div className="absolute inset-4 rounded-full border border-white/30" />
        <div className="absolute inset-8 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          <Img index={0} className="w-full h-full" />
        </div>
      </div>
      
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl rotate-[15deg]">
        <Img index={2} className="w-full h-full" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center w-full px-4">
          <h1 className="text-3xl font-black text-white tracking-[0.2em]">{eventInfo.title}</h1>
          <div className="flex justify-center gap-3 mt-2">
            <span className="w-8 h-[1px] bg-white/50" />
            <span className="text-white/70 text-xs tracking-widest">{eventInfo.date}</span>
            <span className="w-8 h-[1px] bg-white/50" />
          </div>
          <p className="text-purple-300 text-xs tracking-widest">{eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-4xl font-black text-white tracking-[0.25em]">{eventInfo.title}</h1>
          <div className="flex justify-center gap-3 mt-2">
            <span className="w-8 h-[1px] bg-white/50" />
            <span className="text-white/70 text-sm tracking-widest">{eventInfo.date}</span>
            <span className="w-8 h-[1px] bg-white/50" />
          </div>
          <p className="text-purple-300 text-xs mt-1 tracking-widest">{eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'bottom-6' : 'bottom-6'} left-1/2 -translate-x-1/2 flex items-center gap-3`}>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
        <span className="text-xl font-bold text-white">{eventInfo.price}</span>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/50" />
      </div>
    </div>
  );
}

function Variant2({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-950">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-amber-500/30" />
        <div className="absolute top-6 left-6 right-6 bottom-6 border border-amber-400/20" />
        <div className="absolute top-8 left-8 right-8 bottom-8 border border-amber-300/10" />
      </div>
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-44 h-56 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-amber-500/50">
        <Img index={0} className="w-full h-full" />
      </div>
      
      <div className="absolute top-[35%] left-8 w-32 h-44 rounded-sm overflow-hidden shadow-lg border-2 border-amber-500/30 rotate-[-8deg]">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute top-[45%] right-8 w-32 h-44 rounded-sm overflow-hidden shadow-lg border-2 border-amber-500/30 rotate-[8deg]">
        <Img index={2} className="w-full h-full" />
      </div>
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur-xl opacity-50" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center w-full px-4">
          <h1 className="text-2xl font-bold text-amber-100 tracking-[0.3em]">{eventInfo.title}</h1>
          <p className="text-amber-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-2xl font-bold text-amber-100 tracking-[0.3em]">{eventInfo.title}</h1>
          <p className="text-amber-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-2 rounded-sm`}>
        <span className="text-amber-950 font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant3({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cyan-500/20 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-1/3">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border border-cyan-500/30 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-t from-pink-500/20 to-transparent" />
      </div>
      
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-40 h-56 rounded-full overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.5)] border-2 border-cyan-500/50">
        <Img index={0} className="w-full h-full" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.5)] z-20 border-2 border-pink-500/50">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-36 h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.4)] border-2 border-cyan-500/30">
        <Img index={2} className="w-full h-full" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400 tracking-widest">{eventInfo.title}</h1>
        </div>
      ) : (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400 tracking-widest">{eventInfo.title}</h1>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-6'} left-1/2 -translate-x-1/2 px-8 py-2 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-full`}>
        <span className="text-white font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant4({ eventInfo }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-purple-900/30" />

      {/* Imagen central con marco artístico */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-72">
        <div className="absolute inset-0 rounded-lg border border-white/10 rotate-[15deg]" />
        <div className="absolute inset-2 rounded-lg border border-white/10 rotate-[10deg]" />
        <div className="absolute inset-4 rounded-lg border border-white/10 rotate-[5deg]" />

        <div className="absolute inset-6 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.5)]">
          <Img index={1} className="w-full h-full" />
        </div>
      </div>

      {/* Laterales */}
      <div className="absolute top-16 left-8 w-28 h-40 rounded-lg overflow-hidden rotate-[-20deg] border border-white/20">
        <Img index={0} className="w-full h-full" />
      </div>

      <div className="absolute bottom-32 right-8 w-28 h-40 rounded-lg overflow-hidden rotate-[20deg] border border-white/20">
        <Img index={2} className="w-full h-full" />
      </div>

      {/* TEXTO PRINCIPAL */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center w-full px-6">
        
        <h1 className="
          text-3xl 
          text-white 
          font-['Playfair_Display'] 
          tracking-[0.08em]
          leading-tight
        ">
          {eventInfo.title}
        </h1>

        <p className="
          text-white/60 
          text-xs 
          mt-2 
          font-['Inter'] 
          tracking-wide
        ">
          {eventInfo.date} · {eventInfo.place}
        </p>
      </div>

      {/* PRECIO / CTA */}
      <div className="
        absolute bottom-6 left-1/2 -translate-x-1/2 
        border border-white/40 
        px-6 py-2 
        rounded-full 
        backdrop-blur-sm
      ">
        <span className="
          text-white 
          font-['Inter'] 
          font-semibold 
          tracking-wide
        ">
          {eventInfo.price}
        </span>
      </div>

    </div>
  );
}

function Variant5({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.3),transparent)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.2),transparent)]" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.6)] z-20">
        <div className="absolute inset-0 rounded-full border-4 border-white/30" />
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute top-[15%] left-[20%] w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
        <Img index={0} className="w-full h-full" />
      </div>
      <div className="absolute top-[25%] right-[15%] w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
        <Img index={2} className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full border-r border-white/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full border-l border-white/5" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-purple-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-purple-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 px-8 py-3 bg-white/10 backdrop-blur rounded-full border border-white/20`}>
        <span className="text-white font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant6({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-zinc-900">
      <div className="absolute top-0 left-0 w-[70%] h-[85%]"><Img index={0} className="w-full h-full" /></div>
      
      <div className="absolute top-8 right-[-15%] w-[55%] h-[75%] rounded-lg overflow-hidden rotate-[12deg] shadow-2xl z-10">
        <Img index={1} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-l from-zinc-900/50 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-[15%] w-[45%] h-[50%]">
        <Img index={2} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-900 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-8 text-left">
          <h1 className="text-4xl font-black text-white tracking-[0.1em]">{eventInfo.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-8 h-[1px] bg-white/50" />
            <span className="text-white/60 text-sm">{eventInfo.date}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-white/60 text-sm">{eventInfo.place}</span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-24 left-8 text-left">
          <h1 className="text-4xl font-black text-white tracking-[0.1em]">{eventInfo.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-8 h-[1px] bg-white/50" />
            <span className="text-white/60 text-sm">{eventInfo.date}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-white/60 text-sm">{eventInfo.place}</span>
          </div>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-8 bg-white px-6 py-2 rounded-full`}>
        <span className="text-black font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant7({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <Img index={0} className="w-[70%] h-[80%] opacity-30 blur-sm" />
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-[60%] h-[85%]">
        <Img index={0} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent" />
      </div>
      
      <div className="absolute top-[30%] right-0 w-[55%] h-[65%] rounded-t-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.4)]">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[45%] rounded-lg overflow-hidden shadow-xl border border-white/10 rotate-[-5deg]">
        <Img index={2} className="w-full h-full" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-blue-300/70 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-blue-300/70 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 bg-white px-8 py-2 rounded-full`}>
        <span className="text-slate-900 font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant8({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-full"><Img index={0} className="w-full h-full opacity-50 blur-sm" /></div>
        <div className="absolute top-0 left-1/3 w-1/3 h-full"><Img index={1} className="w-full h-full opacity-60 blur-sm" /></div>
        <div className="absolute top-0 left-2/3 w-1/3 h-full"><Img index={2} className="w-full h-full opacity-50 blur-sm" /></div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-56 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.3)] z-20 rotate-[3deg]">
          <Img index={0} className="w-full h-full" />
        </div>
        <div className="absolute w-44 h-60 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.2)] z-10 rotate-[-2deg]" style={{ marginLeft: '20px' }}>
          <Img index={1} className="w-full h-full" />
        </div>
        <div className="absolute w-36 h-52 rounded-lg overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)] z-0 rotate-[5deg]" style={{ marginLeft: '-20px' }}>
          <Img index={2} className="w-full h-full" />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-4xl font-black text-white tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-4xl font-black text-white tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 border border-white/30 px-8 py-2 rounded-full`}>
        <span className="text-white font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant9({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-900/40 via-transparent to-cyan-900/40" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-[85%] blur-sm">
        <div className="absolute inset-0 flex gap-4 items-center justify-center">
          <div className="w-32 h-48 bg-fuchsia-500/30 rounded-full blur-3xl" />
          <div className="w-40 h-56 bg-cyan-500/30 rounded-full blur-3xl" />
          <div className="w-28 h-44 bg-purple-500/30 rounded-full blur-3xl" />
        </div>
      </div>
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-56 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.5)]">
        <Img index={0} className="w-full h-full" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-48 h-64 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.5)] z-20">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-24 right-12 w-32 h-44 rounded-xl overflow-hidden shadow-lg">
        <Img index={2} className="w-full h-full" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-white/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-white/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-6'} left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-600 to-cyan-600 px-8 py-2 rounded-full`}>
        <span className="text-white font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant10({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 border border-white/5 rounded-full" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-64 border border-white/5 rounded-full" />
      </div>
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-44 rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        <Img index={0} className="w-full h-full" />
      </div>
      
      <div className="absolute top-[45%] left-8 w-24 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
        <Img index={1} className="w-full h-full" />
      </div>
      <div className="absolute top-[55%] right-8 w-24 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
        <Img index={2} className="w-full h-full" />
      </div>
      
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-2xl font-bold text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-white/40 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-2xl font-bold text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-white/40 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-6'} left-1/2 -translate-x-1/2 border border-white/20 px-6 py-1 rounded-full`}>
        <span className="text-white text-sm">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant11({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0">
        <Img index={0} className="w-full h-full" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute top-[30%] left-0 w-[20%] h-[1px] bg-white/40" style={{ transform: 'translateX(-50%)' }} />
        <div className="absolute top-[30%] left-[20%] w-[1px] h-[70%] bg-white/10" />
        <div className="absolute top-[60%] left-[40%] w-[1px] h-[40%] bg-white/10" />
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute top-[90%] left-[30%] w-[40%] h-[1px] bg-white/30" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-56 rounded overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-20 border border-white">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center w-full">
        <h1 className="text-4xl font-black text-white tracking-widest">{eventInfo.title}</h1>
        <p className="text-white/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-2 bg-white rounded-sm">
        <span className="text-black font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant12({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent" />
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-[75%] h-[90%]">
        <Img index={0} className="w-full h-full opacity-80 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
      </div>
      
      <div className="absolute top-[20%] right-[5%] w-[45%] h-[60%] rounded-lg overflow-hidden shadow-2xl border border-white/10">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-[25%] left-[15%] w-[35%] h-[45%] rounded-lg overflow-hidden shadow-xl border border-white/10 rotate-[-5deg]">
        <Img index={2} className="w-full h-full" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-8 text-left">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-8 text-left">
          <h1 className="text-3xl font-bold text-white tracking-[0.15em]">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-8 bg-white px-6 py-2 rounded-lg`}>
        <span className="text-slate-900 font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant13({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-orange-900 to-stone-900">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-36 h-48 rounded-sm overflow-hidden shadow-xl border border-orange-500/30">
        <Img index={0} className="w-full h-full sepia" />
      </div>
      
      <div className="absolute top-28 left-[10%] w-28 h-36 rounded-sm overflow-hidden shadow-lg rotate-[-10deg] border border-orange-400/20">
        <Img index={1} className="w-full h-full sepia" />
      </div>
      
      <div className="absolute top-40 right-[10%] w-28 h-36 rounded-sm overflow-hidden shadow-lg rotate-[10deg] border border-orange-400/20">
        <Img index={2} className="w-full h-full sepia" />
      </div>
      
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-48 h-1 bg-orange-500/30" />
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-48 h-1 bg-orange-500/30" />
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-orange-100 tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-orange-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-orange-100 tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-orange-300/60 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 border border-orange-400/40 px-8 py-2 rounded-sm`}>
        <span className="text-orange-100 font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant14({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-black">
      <div className="absolute inset-0 flex">
        <div className="w-1/4 h-full border-r border-white/10">
          <div className="w-full h-[30%]"><Img index={0} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[30%] border-y border-white/10"><Img index={1} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[30%] border-y border-white/10"><Img index={2} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[10%] bg-gradient-to-r from-white/5 to-transparent" />
        </div>
        <div className="w-1/4 h-full border-r border-white/10">
          <div className="w-full h-[40%]"><Img index={1} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[30%] border-y border-white/10"><Img index={2} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[20%] bg-gradient-to-r from-white/5 to-transparent" />
        </div>
        <div className="w-1/4 h-full border-r border-white/10">
          <div className="w-full h-[25%]"><Img index={2} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[35%] border-y border-white/10"><Img index={0} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[30%] border-y border-white/10"><Img index={1} className="w-full h-full grayscale" /></div>
        </div>
        <div className="w-1/4 h-full">
          <div className="w-full h-[50%]"><Img index={0} className="w-full h-full grayscale" /></div>
          <div className="w-full h-[30%] border-y border-white/10"><Img index={1} className="w-full h-full grayscale" /></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-48 rounded overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.3)] z-20 border border-white">
        <Img index={1} className="w-full h-full" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-black text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-black text-white tracking-widest">{eventInfo.title}</h1>
          <p className="text-white/50 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-6'} left-1/2 -translate-x-1/2 bg-white px-8 py-2 rounded-full`}>
        <span className="text-black font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

function Variant15({ eventInfo, textPosition }) {
  return (
    <div className="relative w-[360px] h-[640px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <Img index={0} className="w-full h-full blur-sm" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-cyan-950/50" />
      </div>
      
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-52 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.4)] border border-cyan-500/30">
        <Img index={0} className="w-full h-full" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.5)] z-20 border-2 border-cyan-400/50">
        <Img index={1} className="w-full h-full" />
      </div>
      
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-40 rounded-lg overflow-hidden shadow-lg border border-cyan-500/20">
        <Img index={2} className="w-full h-full" />
      </div>
      
      {textPosition === 'top' ? (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-white tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-cyan-300/70 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      ) : (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="text-3xl font-bold text-white tracking-[0.2em]">{eventInfo.title}</h1>
          <p className="text-cyan-300/70 text-xs mt-1">{eventInfo.date} · {eventInfo.place}</p>
        </div>
      )}
      
      <div className={`absolute ${textPosition === 'top' ? 'top-[75%]' : 'bottom-8'} left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-2 rounded-full`}>
        <span className="text-white font-bold">{eventInfo.price}</span>
      </div>
    </div>
  );
}

const variantComponents = [
  Variant1, Variant2, Variant3, Variant4, Variant5, Variant6, Variant7, Variant8,
  Variant9, Variant10, Variant11, Variant12, Variant13, Variant14, Variant15
];

export function Promos() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [textPosition, setTextPosition] = useState('bottom');
  const [eventInfo, setEventInfo] = useState(initialEventInfo);
  const [isDownloading, setIsDownloading] = useState(false);
  const variantRef = useRef(null);
  
  const CurrentVariant = variantComponents[selectedVariant];

  const handleDownload = async () => {
    if (!variantRef.current || isDownloading) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(variantRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${eventInfo.title || 'promo'}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading:', error);
    }
    setIsDownloading(false);
  };

  const handleInputChange = (field, value) => {
    setEventInfo(prev => ({ ...prev, [field]: value }));
  };

  if (!CurrentVariant) {
    return (
      <div className="bg-black min-h-screen p-4 flex items-center justify-center">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Catálogo de Publicidades</h1>
        <p className="text-white/60 text-center mb-6 text-sm">Formato 9:16 · Eventos</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {variants?.map((v, i) => (
            <button
              key={i}
              onClick={() => setSelectedVariant(i)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                selectedVariant === i
                  ? "bg-teal-500 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-shrink-0" ref={variantRef}>
            <CurrentVariant eventInfo={eventInfo} textPosition={textPosition} />
          </div>
          
          <div className="text-white max-w-md space-y-4">
            <h2 className="text-xl font-semibold">{variants[selectedVariant].name}</h2>
            <p className="text-white/60 text-sm">{variants[selectedVariant].description}</p>
            
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <p className="text-white/40 text-xs font-semibold uppercase">Posición del Texto</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTextPosition('top')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${textPosition === 'top' ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Arriba
                </button>
                <button
                  onClick={() => setTextPosition('bottom')}
                  className={`flex-1 py-2 px-3 rounded text-sm transition-colors ${textPosition === 'bottom' ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Abajo
                </button>
              </div>
              
              <p className="text-white/40 text-xs font-semibold uppercase mt-4">Editar Texto</p>
              <input
                type="text"
                value={eventInfo.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Título"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
              <input
                type="text"
                value={eventInfo.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                placeholder="Fecha"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
              <input
                type="text"
                value={eventInfo.place}
                onChange={(e) => handleInputChange('place', e.target.value)}
                placeholder="Lugar"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
              <input
                type="text"
                value={eventInfo.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Precio"
                className="min-w-0 flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isDownloading ? 'Descargando...' : 'Descargar Imagen'}
            </button>
            
            <p className="text-white/40 text-xs">
              Las imágenes se generan en alta resolución (720x1280)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
