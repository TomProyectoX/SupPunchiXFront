import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    line1: "WHEY",
    line2: "POWER",
    image: "https://i.imgur.com/VhOmT2n.png",
    width: "w-[260px] md:w-[360px] lg:w-[420px]",
  },
  {
    line1: "STAR",
    line2: "NUTRITION",
    image: "https://i.imgur.com/rWSjgF9.png",
    width: "w-[240px] md:w-[340px] lg:w-[390px]",
  },
  {
    line1: "SPORT",
    line2: "GOLD",
    image: "https://i.imgur.com/wIYJVXA.png",
    width: "w-[190px] md:w-[280px] lg:w-[320px]",
  },
  {
    line1: "OPTIMUM",
    line2: "NUTRITION",
    image: "https://i.imgur.com/g21e73Z.png",
    width: "w-[190px] md:w-[270px] lg:w-[310px]",
  },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  duration: Math.random() * 8 + 10,
  delay: Math.random() * 2,
}));

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];
  const imageOnLeft = current % 2 === 0;

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">

      {/* HERO PRINCIPAL */}
      <div className="relative min-h-[85vh] flex items-center px-6 md:px-16 lg:px-24">

        {/* PARTICULAS FLOTANTES */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#CCFF00]"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                bottom: "-20px",
                willChange: "transform, opacity",
              }}
              animate={{
                y: ["0vh", "-95vh"],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* GLOW DE FONDO */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[#CCFF00] blur-[140px] opacity-[0.08]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-8 ${
                imageOnLeft ? "" : "md:[direction:rtl]"
              }`}
            >

              {/* IMAGEN DEL PRODUCTO */}
              <motion.div
                initial={{ opacity: 0, x: imageOnLeft ? -60 : 60, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="flex justify-center md:[direction:ltr]"
              >
                <img
                  src={slide.image}
                  alt={`${slide.line1} ${slide.line2}`}
                  className={`${slide.width} h-auto object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.95)]`}
                />
              </motion.div>

              {/* TEXTO */}
              <div className={`text-center md:text-left md:[direction:ltr] min-w-0 ${imageOnLeft ? "" : "md:text-right"}`}>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center gap-3 mb-6 ${
                    imageOnLeft ? "" : "md:ml-auto md:flex-row-reverse"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-[#CCFF00] text-xs font-black uppercase tracking-widest">
                    Nuevos Ingresos
                  </span>
                  <span className="w-8 h-[1px] bg-[#CCFF00]"></span>
                </motion.div>

                <h1
                  className="text-white uppercase font-black tracking-tighter leading-[0.92] select-none"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="block"
                  >
                    {slide.line1}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="block text-[#CCFF00] italic"
                  >
                    {slide.line2}
                  </motion.span>
                </h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8"
                >
                  <Link to="/shop">
                    <button className="bg-[#CCFF00] text-black px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">
                      Ver Productos
                    </button>
                  </Link>
                </motion.div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* INDICADORES DE CARRUSEL */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-[#CCFF00]" : "w-1.5 bg-[#3A3A3A] hover:bg-[#555]"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CCFF00] to-transparent z-30"></div>

    </section>
  );
};

export default Hero;