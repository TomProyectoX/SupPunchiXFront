import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSabores } from "../../../../../redux/saboresSlice";

export default function FilterFlavour({ selectedFlavours, onFlavourChange }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const sabores = useSelector((state) => state.sabores.sabores);
  const loading = useSelector((state) => state.sabores.loading);

  useEffect(() => {
    dispatch(fetchSabores(token));
  }, [dispatch, token]);

  const handleChange = (saborId) => {
    const newSelected = selectedFlavours.includes(saborId)
      ? selectedFlavours.filter((id) => id !== saborId)
      : [...selectedFlavours, saborId];

    onFlavourChange(newSelected);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Sabor
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando sabores...</p>
      ) : (
        <div className="flex flex-col gap-1">
          {sabores.map((sabor) => {
            const isChecked = selectedFlavours.includes(sabor.idSabor);
            return (
              <label
                key={sabor.idSabor}
                className="flex items-center gap-3 cursor-pointer group py-1.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleChange(sabor.idSabor)}
                  className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                    isChecked ? "text-[#CCFF00]" : "text-white group-hover:text-[#CCFF00]"
                  }`}
                >
                  {sabor.nombre}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
