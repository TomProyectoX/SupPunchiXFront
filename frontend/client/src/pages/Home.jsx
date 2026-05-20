
import Hero from "../assets/components/react/Hero"
import FeaturedProducts from "../assets/components/react/FeaturedProducts"
import Categories from "../assets/components/react/Categories"
import Benefits from "../assets/components/react/Benefits"

import Banner from "../assets/components/react/Banner"
import Footer from "./Footer"

const Home = () => {

  return (

    <div className="bg-[#0A0A0A] min-h-screen">

      <Hero />

      <Banner />

      <FeaturedProducts />

      <Categories />

      <Benefits />

      <Footer />

    </div>

  )
}

export default Home