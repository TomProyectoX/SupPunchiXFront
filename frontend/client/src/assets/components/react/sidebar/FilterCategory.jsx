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
          {categories.map((cat) => (
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
                {cat.description} {/* Mostramos la descripción de la categoría al lado del checkbox */}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}