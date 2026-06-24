const DeliveryAddressCard = ({ direccion }) => {
  return (
    <div className="border border-[#262626] rounded-2xl p-6 bg-black">
      <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-5">Dirección de entrega</p>
      <div className="space-y-3 text-sm">
        <p>{direccion?.calle} {direccion?.numero}</p>
        <p>{direccion?.ciudad}</p>
        <p>{direccion?.provincia}</p>
        <p>{direccion?.codigoPostal}</p>
      </div>
    </div>
  );
};

export default DeliveryAddressCard;