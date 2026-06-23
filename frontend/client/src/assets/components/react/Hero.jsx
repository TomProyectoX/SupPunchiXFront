import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    line1: "WHEY",
    line2: "POWER",
    image: "https://i.imgur.com/VhOmT2n.png",
    width: "w-[220px] md:w-[280px] lg:w-[340px]",
  },
  {
    line1: "STAR",
    line2: "NUTRITION",
    image: "https://i.imgur.com/rWSjgF9.png",
    width: "w-[200px] md:w-[260px] lg:w-[300px]",
  },
  {
    line1: "SPORT",
    line2: "GOLD",
    image: "https://i.imgur.com/wIYJVXA.png",
    width: "w-[160px] md:w-[200px] lg:w-[240px]",
  },
  {
    line1: "OPTIMUM",
    line2: "NUTRITION",
    image: "https://i.imgur.com/g21e73Z.png",
    width: "w-[200px] md:w-[260px] lg:w-[300px]",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 400);

      setTimeout(() => {
        setShowImage(true);
      }, 1300);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">

      {/* HERO PRINCIPAL */}
      <div className="relative min-h-[85vh] flex items-center justify-center px-6">

        {/* GLOW DE FONDO ANIMADO */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#CCFF00] blur-[180px] opacity-10"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* TEXTO GIGANTE DE FONDO */}
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 bg-[#CCFF00] text-black text-sm md:text-base font-black uppercase mb-8 tracking-widest"
          >
            Nuevos Ingresos
          </motion.span>

          <h1 className="text-white uppercase font-black tracking-tighter leading-[0.82] select-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={`line1-${current}`}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="block text-[15vw] md:text-[10vw] lg:text-[8vw]"
              >
                {slide.line1}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={`line2-${current}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                className="block text-[15vw] md:text-[10vw] lg:text-[8vw] text-[#CCFF00] italic"
              >
                {slide.line2}
              </motion.span>
            </AnimatePresence>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <Link to="/shop">
              <button className="bg-[#CCFF00] text-black px-10 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300">
                Ver Productos
              </button>
            </Link>
          </motion.div>

        </div>

        {/* IMAGEN DEL PRODUCTO FLOTANDO ENCIMA DEL TEXTO */}
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {showImage && (
              <motion.img
                key={current}
                src={slide.image}
                alt={`${slide.line1} ${slide.line2}`}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${slide.width} h-auto object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.9)]`}
              />
            )}
          </AnimatePresence>
        </div>

        {/* INDICADORES DE CARRUSEL */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setShowImage(false);
                setTimeout(() => setCurrent(index), 400);
                setTimeout(() => setShowImage(true), 800);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-[#CCFF00]" : "w-1.5 bg-[#3A3A3A] hover:bg-[#555]"
              }`}
            />
          ))}
        </div>

      </div>

      {/* FRANJA DE TEXTO DEBAJO DEL HERO */}
      <div className="relative border-t border-[#1A1A1A] py-10 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg max-w-xl mx-auto text-center font-medium leading-relaxed"
        >
          Sin atajos. Sin excusas.{" "}
          <span className="text-[#CCFF00] font-bold">Solo resultados.</span>{" "}
          Suplementos importados, certificados, para quienes entrenan en serio.
        </motion.p>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CCFF00] to-transparent z-30"></div>

    </section>
  );
};

export default Hero;