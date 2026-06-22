import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSabores } from "../../../../redux/slices/flavourSlice";

export default function FilterFlavour({ selectedFlavours, onFlavourChange }) {
  const dispatch = useDispatch();
  const { sabores, loading } = useSelector((state) => state.flavours);

  useEffect(() => {
    dispatch(fetchSabores());
  }, [dispatch]);

  const handleChange = (saborId) => {
    const newSelected = selectedFlavours.includes(saborId)
      ? selectedFlavours.filter((id) => id !== saborId)
      : [...selectedFlavours, saborId];

    onFlavourChange(newSelected);
    console.log("Sabores seleccionados:", newSelected);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Sabor
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando sabores...</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {sabores.map((sabor) => (
            <label
              key={sabor.idSabor}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedFlavours.includes(sabor.idSabor)}
                onChange={() => handleChange(sabor.idSabor)}
                className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors">
                {sabor.nombre}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}