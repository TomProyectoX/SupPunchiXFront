import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../../../../../redux/categoriasSlice";

export default function FilterCategory({ selectedCategories, onCategoryChange }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const categorias = useSelector((state) => state.categorias.categorias);
  const loading = useSelector((state) => state.categorias.loading);

  useEffect(() => {
    dispatch(fetchCategorias(token));
  }, []);

  const handleChange = (categoriaId) => {
    const newSelected = selectedCategories.includes(categoriaId)
      ? selectedCategories.filter((id) => id !== categoriaId)
      : [...selectedCategories, categoriaId];

    onCategoryChange(newSelected);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Categoría
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando categorías...</p>
      ) : (
        <div className="flex flex-col gap-1">
          {categorias.map((categoria) => {
            const isChecked = selectedCategories.includes(categoria.id);
            return (
              <label
                key={categoria.id}
                className="flex items-center gap-3 cursor-pointer group py-1.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleChange(categoria.id)}
                  className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                    isChecked ? "text-[#CCFF00]" : "text-white group-hover:text-[#CCFF00]"
                  }`}
                >
                  {categoria.description}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
