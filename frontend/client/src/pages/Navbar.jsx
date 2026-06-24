import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../assets/components/react/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearOrden } from "../../redux/ordenSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const puntosActuales = useSelector((state) => state.puntos.puntosActuales);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOrden());
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "whitespace-nowrap border-b-2 border-[#CCFF00] py-1 text-xs font-black uppercase tracking-widest text-[#CCFF00] transition-all"
      : "whitespace-nowrap py-1 text-xs font-black uppercase tracking-widest text-white transition-colors hover:text-[#CCFF00]";

  return (
    <>
      <nav className="w-full border-b border-[#262626] bg-[#0A0A0A] px-6 py-4 md:px-12">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[1fr_2fr_1fr] items-center gap-6">
          <div className="flex items-center justify-start gap-8">
            <NavLink
              to="/"
              className="whitespace-nowrap text-xl font-black uppercase italic tracking-tighter text-[#CCFF00] md:text-2xl"
            >
              Punchis.
            </NavLink>

            <div className="hidden gap-6 md:flex">
              <NavLink to="/" className={navStyle}>Inicio</NavLink>
              <NavLink to="/shop" className={navStyle}>Catalogo</NavLink>
              {token && <NavLink to="/mis-pedidos" className={navStyle}>Mis Pedidos</NavLink>}
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-full max-w-sm">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            {token && (
              <div className="text-white">
                Puntos: <span className="font-bold text-[#CCFF00]">{puntosActuales}</span>
              </div>
            )}
            <NavLink to="/cart" className="relative text-white transition-colors hover:text-[#CCFF00]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </NavLink>

            {token ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-white transition-colors hover:text-[#CCFF00]"
              >
                Cerrar Sesion
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-white transition-colors hover:text-[#CCFF00]"
              >
                Iniciar Sesion
              </button>
            )}
          </div>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
          <div className="w-full max-w-md rounded-3xl border border-[#262626] bg-[#111111] p-8 text-center text-white shadow-2xl">
            <h2 className="text-2xl font-black uppercase">¿Seguro queres cerrar sesion?</h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-[#CCFF00] px-6 py-4 font-black uppercase text-black transition hover:bg-white"
              >
                Si
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="rounded-2xl border border-[#2A2A2A] px-6 py-4 font-black uppercase text-white transition hover:border-[#CCFF00]"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;