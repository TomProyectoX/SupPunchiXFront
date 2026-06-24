import { Link } from "react-router-dom";

const PagoConfirmado = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg space-y-8">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#CCFF00] flex items-center justify-center">
          <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-5xl font-black uppercase tracking-tight">
          Gracias por tu compra
        </h1>

        <p className="text-lg text-gray-400">
          Tu pago fue procesado con éxito. Te enviaremos un email con los detalles de tu pedido.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/home"
            className="bg-[#CCFF00] text-black font-black uppercase py-4 px-8 rounded-lg hover:bg-white transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            to="/shop"
            className="border-2 border-[#CCFF00] text-[#CCFF00] font-black uppercase py-4 px-8 rounded-lg hover:bg-[#CCFF00]/10 transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagoConfirmado;
