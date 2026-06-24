import { useState } from "react"
import { motion } from 'framer-motion'

import Navbar from "./Navbar"
import Hero from "../assets/components/react/Hero"
import FeaturedProducts from "../assets/components/react/FeaturedProducts"
import BrandsSection from "../assets/components/react/homesection/BrandsSection"
import CategoriesSection from "../assets/components/react/homesection/CategoriesSection"
import Benefits from "../assets/components/react/Benefits"
import Footer from "./Footer"
import Banner from "../assets/components/react/Banner"
import Popup from "../assets/components/react/Popup"
import TopBar from "../assets/components/react/ToBar"

const Home = () => {
  const [showPopup, setShowPopup] = useState(true)

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Popup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />

      {/* ENVOLTORIO FIJO HEADER TOTAL */}
      <header className="fixed top-0 left-0 w-full z-50">
        <TopBar />
        <Navbar />
      </header>

      {/* CONTENIDO DE LA PÁGINA */}
      <div className="pt-[100px] md:pt-[30px]">
        <Hero />
        <Banner />
        <FeaturedProducts />
        <BrandsSection />
        <CategoriesSection />
        <Benefits />

        {/* FRANJA DE TEXTO - SLOGAN, al final de todo */}
        <div className="relative bg-[#0A0A0A] border-t border-[#1A1A1A] py-10 px-6">
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
      </div>

    </div>
  )
}

export default Home