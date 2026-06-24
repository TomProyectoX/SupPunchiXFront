import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarcas } from "../../../../../redux/marcasSlice";

export default function FilterBrand({ selectedBrands, onBrandChange }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const marcas = useSelector((state) => state.marcas.marcas);
  const loading = useSelector((state) => state.marcas.loading);

  useEffect(() => {
    dispatch(fetchMarcas(token));
  }, []);

  const handleChange = (marcaId) => {
    const newSelected = selectedBrands.includes(marcaId)
      ? selectedBrands.filter((id) => id !== marcaId)
      : [...selectedBrands, marcaId];

    onBrandChange(newSelected);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Marca
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando marcas...</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {marcas.map((marca) => (
            <label
              key={marca.idMarca}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(marca.idMarca)}
                onChange={() => handleChange(marca.idMarca)}
                className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors">
                {marca.nombre}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}