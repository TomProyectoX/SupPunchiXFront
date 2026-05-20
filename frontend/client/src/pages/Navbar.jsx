import { NavLink } from "react-router-dom"

const Navbar = () => {

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-[#CCFF00] border-b-2 border-[#CCFF00] font-bold py-1"
      : "text-white hover:text-[#CCFF00] transition-colors py-1"

  return (

    <header className="bg-[#0A0A0A] fixed top-0 w-full z-50 border-b border-[#262626] flex justify-between items-center px-6 h-16">

      <div className="flex items-center gap-8">

        <NavLink
          to="/"
          className="text-2xl font-black text-[#CCFF00] italic tracking-tighter uppercase"
        >
          IRON ARCH
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">

          <NavLink
            to="/"
            className={navStyle}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={navStyle}
          >
            Shop
          </NavLink>

          <NavLink
            to="/bundles"
            className={navStyle}
          >
            Bundles
          </NavLink>

          <NavLink
            to="/support"
            className={navStyle}
          >
            Support
          </NavLink>

        </nav>

      </div>

      <div className="flex items-center gap-4">

        <button className="text-white hover:text-[#CCFF00] transition-colors">
          🛒
        </button>

        <NavLink
          to="/login"
          className={navStyle}
        >
          👤
        </NavLink>

      </div>

    </header>

  )

}

export default Navbar