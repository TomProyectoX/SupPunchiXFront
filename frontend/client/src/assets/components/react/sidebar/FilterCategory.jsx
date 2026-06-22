import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../../../../redux/slices/categorySlice";

export default function FilterCategory({ selectedCategories, onCategoryChange }) {
  const dispatch = useDispatch();
  const { categorias, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleChange = (categoriaId) => {
    const newSelected = selectedCategories.includes(categoriaId)
      ? selectedCategories.filter((id) => id !== categoriaId)
      : [...selectedCategories, categoriaId];

    onCategoryChange(newSelected);
    console.log("Categorías seleccionadas:", newSelected);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Categoría
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando categorías...</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {categorias.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleChange(cat.id)}
                className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors">
                {cat.description}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}