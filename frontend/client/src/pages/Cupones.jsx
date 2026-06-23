import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CuponCard from "../assets/components/react/sistemaPuntos/CuponCard";
import FiltroCupon from "../assets/components/react/sistemaPuntos/FiltroCupon";
import { fetchCupones, canjearCupon } from "../Redux/slices/cuponSlice";
import Navbar from "./Navbar";

const Cupones = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cupones, puntos, loading, error, canjeoExito, canjeoError, canjeoLoading } = useSelector(
    (state) => state.cupones
  );
  const { user } = useSelector((state) => state.auth);
  const [filtro, setFiltro] = useState("accesibles");
  const [cuponesTomostrar, setCuponesMostrar] = useState([]);

  // Cargar cupones al montar el componente
  useEffect(() => {
    dispatch(fetchCupones());
  }, [dispatch]);

  // Aplicar filtro
  useEffect(() => {
    let filtrados = [...cupones];

    if (filtro === "accesibles") {
      filtrados = filtrados.filter(
        (c) => !c.bloqueado && puntos >= c.costo
      );
    } else if (filtro === "todos") {
      filtrados = filtrados.filter((c) => !c.bloqueado);
    } else if (filtro === "bloqueados") {
      filtrados = filtrados.filter((c) => c.bloqueado);
    }

    setCuponesMostrar(filtrados);
  }, [filtro, cupones]);

  // Mostrar mensajes de éxito/error del canje
  useEffect(() => {
    if (canjeoExito) {
      navigate("/cupon-detalle");
    }
    if (canjeoError) {
      alert(`Error: ${canjeoError}`);
    }
  }, [canjeoExito, canjeoError, navigate]);

  const handleCanjear = (cupon) => {
    if (user && puntos >= cupon.costo) {
      dispatch(canjearCupon({ cuponId: cupon.id, userId: user.id }));
    } else if (!user) {
      alert("Debes iniciar sesión para canjear cupones");
    } else {
      alert("Puntos insuficientes");
    }
  };

  return (
    <main className="pt-24 px-margin max-w-container-max mx-auto pb-24">
      <Navbar />
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="font-headline-lg text-headline-lg uppercase text-white tracking-tighter">
            CANJE DE <span className="text-[#CCFF00]">CUPONES</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-xl">
            Utiliza tus puntos acumulados por entrenar y cumplir tus metas para
            obtener beneficios exclusivos en los mejores centros de alto
            rendimiento.
          </p>
        </div>
        <div className="bg-[#141414] p-6 border-l-4 border-[#CCFF00] flex flex-col gap-1 min-w-[200px]">
          <span className="font-label-bold text-label-bold text-on-surface-variant">
            SALDO ACTUAL
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-xl text-[48px] text-[#CCFF00] font-black italic">
              {puntos}
            </span>
            <span className="font-headline-md text-headline-md text-white">
              PTS
            </span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <FiltroCupon
        cupones={cupones}
        puntos={puntos}
        onFiltroChange={setFiltro}
      />

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-gutter">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4 animate-spin">
              refresh
            </span>
            <h3 className="text-xl font-headline-md text-white">Cargando cupones...</h3>
          </div>
        ) : error ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-error mb-4">error</span>
            <h3 className="text-xl font-headline-md text-white">Error al cargar cupones</h3>
            <p className="text-on-surface-variant">{error}</p>
          </div>
        ) : cuponesTomostrar.length > 0 ? (
          cuponesTomostrar.map((cupon) => (
            <CuponCard
              key={cupon.id}
              cupon={cupon}
              puntos={puntos}
              onCanjear={handleCanjear}
              canjeoLoading={canjeoLoading}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">
              card_giftcard
            </span>
            <h3 className="text-xl font-headline-md text-white mb-2">
              No hay cupones disponibles
            </h3>
            <p className="text-on-surface-variant">
              {filtro === "accesibles"
                ? "Necesitas más puntos para acceder a los cupones disponibles"
                : filtro === "bloqueados"
                ? "No hay cupones bloqueados en este momento"
                : "No hay cupones disponibles en este momento"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cupones;
