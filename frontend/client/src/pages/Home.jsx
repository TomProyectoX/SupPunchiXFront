import { useState } from "react"

import Navbar from "./Navbar"
import Hero from "../assets/components/react/Hero"
import FeaturedProducts from "../assets/components/react/FeaturedProducts"
import BrandsSection from "../assets/components/react/BrandsSection"
import CategoriesSection from "../assets/components/react/CategoriesSection"
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
      </div>

    </div>
  )
}

export default Home