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
  const puntosActuales = useSelector((state) => state.puntos?.puntosActuales ?? 0);
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
      <nav className="bg-black w-full border-b border-[#262626] px-6 md:px-12 py-4">
        <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-6 w-full max-w-[1400px] mx-auto">

          <div className="flex items-center gap-3 justify-start">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-black rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
              <video
                src="https://i.imgur.com/G4xNBuD.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <NavLink to="/" className="text-xl md:text-2xl font-black text-[#CCFF00] italic tracking-tighter uppercase whitespace-nowrap">
              Punchis.
            </NavLink>

            <div className="hidden md:flex gap-6 ml-4">
              <NavLink to="/" className={navStyle}>Inicio</NavLink>
              <NavLink to="/shop" className={navStyle}>Catálogo</NavLink>
              {token && <NavLink to="/mis-pedidos" className={navStyle}>Mis Pedidos</NavLink>}
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-full max-w-sm">
              <SearchBar />
            </div>
          </div>

          <div className="flex justify-end items-center gap-6">
            {token && (
              <div className="text-white text-xs font-black uppercase tracking-widest">
                Puntos: <span className="font-bold text-[#CCFF00]">{puntosActuales}</span>
              </div>
            )}

            {token ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-white hover:text-[#CCFF00] transition-colors text-xs uppercase font-black tracking-widest"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-[#CCFF00] transition-colors text-xs uppercase font-black tracking-widest"
              >
                Iniciar Sesión
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
