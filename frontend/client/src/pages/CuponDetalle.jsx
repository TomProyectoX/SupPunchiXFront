import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCanjeoExito } from "../Redux/slices/cuponSlice";

const CuponDetalle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cuponCanjeado } = useSelector((state) => state.cupones);

  useEffect(() => {
    if (!cuponCanjeado) {
      navigate("/cupones");
    }
  }, [cuponCanjeado, navigate]);

  if (!cuponCanjeado) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(cuponCanjeado.codigoUnico).then(() => {
      const toast = document.getElementById("copy-toast");
      toast?.classList.remove("translate-y-24");
      toast?.classList.add("translate-y-0");
      setTimeout(() => {
        toast?.classList.remove("translate-y-0");
        toast?.classList.add("translate-y-24");
      }, 2000);
    });
  };

  const handleVolver = () => {
    dispatch(resetCanjeoExito());
    navigate("/cupones");
  };

  return (
    <main className="flex-grow pt-32 pb-24 px-margin max-w-container-max mx-auto w-full flex flex-col items-center justify-center relative">
      {/* Success Container */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Icono Success */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-none border-2 border-[#CCFF00] flex items-center justify-center animate-pulse-border success-glow">
            <span
              className="material-symbols-outlined text-[#CCFF00] text-5xl"
              style={{ fontVariationSettings: "'wght' 700" }}
            >
              check_circle
            </span>
          </div>
        </div>

        {/* Header Success */}
        <h1 className="font-headline-md text-headline-md text-brand-lime uppercase mb-4 tracking-tight">
          ✅ CUPÓN CANJEADO CORRECTAMENTE
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-md mx-auto mb-12">
          Tu beneficio ha sido activado. Presenta este código en la recepción para validarlo.
        </p>

        {/* Coupon Detail Card */}
        <div className="bg-[#141414] border border-[#262626] p-8 text-left mb-10 relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-[#CCFF00] transform translate-x-6 -translate-y-6 rotate-45"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
            <div>
              <p className="font-label-bold text-xs text-on-surface-variant uppercase mb-1">
                Beneficio
              </p>
              <p className="font-headline-md text-2xl text-white uppercase">
                {cuponCanjeado.cupon.nombre}
              </p>
            </div>

            <div>
              <p className="font-label-bold text-xs text-on-surface-variant uppercase mb-1">
                Descripción
              </p>
              <p className="font-body-md text-white">
                {cuponCanjeado.cupon.descripcion}
              </p>
            </div>

            <div>
              <p className="font-label-bold text-xs text-on-surface-variant uppercase mb-1">
                Estado
              </p>
              <span className="inline-flex items-center gap-1 bg-[#262626] px-2 py-1 text-[10px] text-[#CCFF00] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
                Activo
              </span>
            </div>

            <div>
              <p className="font-label-bold text-xs text-on-surface-variant uppercase mb-1">
                Costo
              </p>
              <p className="font-stats-num text-[#CCFF00]">
                {cuponCanjeado.cupon.costoPuntos} PTS
              </p>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-[#262626] mt-4">
              <p className="font-label-bold text-xs text-on-surface-variant uppercase mb-3">
                Código UUID
              </p>
              <div className="bg-[#0A0A0A] border border-[#262626] p-4 flex items-center justify-between group">
                <code
                  className="font-stats-num text-sm text-brand-lime break-all"
                  id="coupon-code"
                >
                  {cuponCanjeado.codigoUnico}
                </code>
                <button
                  onClick={handleCopy}
                  className="ml-4 flex items-center gap-2 text-white hover:text-brand-lime transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    content_copy
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCopy}
            className="px-8 py-4 bg-[#CCFF00] text-black font-headline-md text-lg uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">content_copy</span>
            COPIAR CÓDIGO
          </button>
          <button
            onClick={handleVolver}
            className="px-8 py-4 border-2 border-white text-white font-headline-md text-lg uppercase tracking-wider transition-all hover:bg-white hover:text-black active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">undo</span>
            VOLVER A RECOMPENSAS
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className="fixed bottom-24 bg-[#CCFF00] text-black font-label-bold px-6 py-3 transform translate-y-24 transition-transform duration-300 z-[100]"
        id="copy-toast"
      >
        CÓDIGO COPIADO AL PORTAPAPELES
      </div>
    </main>
  );
};

export default CuponDetalle;
