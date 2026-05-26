import { useState, useEffect } from "react";

export default function FilterFlavour({ selectedFlavours, onFlavourChange }) {
  const [sabores, setSabores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sabores desde la BD
  useEffect(() => {
    const getSabores = async () => {
      try {
        const res = await fetch("http://localhost:4002/sabores"); // Ajusta tu endpoint
        const data = await res.json();
        setSabores(data); // Guardamos el array de sabores
      } catch (error) {
        console.error("Error fetching sabores:", error);
      } finally {
        setLoading(false);
      }
    };

    getSabores();
  }, []);

  // Manejar cambios en checkboxes
  const handleChange = (saborId) => {
    const newSelected = selectedFlavours.includes(saborId)
      ? selectedFlavours.filter((id) => id !== saborId) // Si ya está, lo quitamos
      : [...selectedFlavours, saborId]; // Si no está, lo añadimos

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