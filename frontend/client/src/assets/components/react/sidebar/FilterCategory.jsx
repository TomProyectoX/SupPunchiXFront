import { useState, useEffect } from "react";

export default function FilterCategory({ selectedCategories, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categorías desde la BD
  useEffect(() => {
    const getCategorias = async () => {
      try {
        const res = await fetch("http://localhost:4002/categories"); // Ajusta tu endpoint
        const data = await res.json();
        setCategories(data); // Guardamos el array de categorías
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategorias();
  }, []);

  // Manejar cambios en checkboxes
  const handleChange = (categoriaId) => {
    const newSelected = selectedCategories.includes(categoriaId)
      ? selectedCategories.filter((id) => id !== categoriaId) // Si ya está, lo quitamos
      : [...selectedCategories, categoriaId]; // Si no está, lo añadimos

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
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer group py-1.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleChange(cat.id)}
                  className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
                />
                <span
                  className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                    isChecked ? "text-[#CCFF00]" : "text-white group-hover:text-[#CCFF00]"
                  }`}
                >
                  {cat.description}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}