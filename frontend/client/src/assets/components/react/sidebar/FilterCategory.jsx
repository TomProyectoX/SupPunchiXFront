import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../../../../../redux/categoriasSlice";

export default function FilterCategory({ selectedCategories, onCategoryChange }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const categorias = useSelector((state) => state. categorias.categorias)
  const loading = useSelector((state) => state. categorias.loading)

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
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-[#CCFF00]">
        Categoría
      </h3>

      {loading ? (
        <p className="text-sm text-gray-400">Cargando categorías...</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {categorias.map((categoria) => (
            <label
              key={categoria.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(categoria.id)}
                onChange={() => handleChange(categoria.id)}
                className="w-3 h-3 appearance-none border border-[#3A3A3A] bg-[#0A0A0A] checked:bg-[#CCFF00] checked:border-[#CCFF00] cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#CCFF00] transition-colors">
                {categoria.description} {/* Mostramos la descripción de la categoría al lado del checkbox */}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}