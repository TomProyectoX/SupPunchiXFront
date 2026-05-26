import { useState, useEffect } from "react";

export default function FilterBrand({ selectedBrands, onBrandChange }) { // recibos los estados de los filtros de estados y el callback para actualizar esos estados en el componente padre (Sidebar)
  const [marcas, setMarcas] = useState([]); // Estado local para almacenar las marcas obtenidas de la BD
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Fetch marcas desde la BD
  useEffect(() => {
    const getMarcas = async () => { 
      try {
        const res = await fetch("http://localhost:4002/marcas"); 
        const data = await res.json();
        setMarcas(data); // Guardamos el array de marcas
      } catch (error) {
        console.error("Error fetching marcas:", error);
      } finally {
        setLoading(false);
      }
    };

    getMarcas();
  }, []);

  // Manejar cambios en checkboxes
  const handleChange = (marcaId) => {
    const newSelected = selectedBrands.includes(marcaId) // Si la marca ya está seleccionada, la quitamos; si no, la añadimos
      ? selectedBrands.filter((id) => id !== marcaId) // Si ya está, lo quitamos
      : [...selectedBrands, marcaId]; // Si no está, lo añadimos

    onBrandChange(newSelected); // Llamamos al callback del componente padre para actualizar el estado de las marcas seleccionadas
    console.log("Marcas seleccionadas:", newSelected);
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
                {marca.nombre} {/* Mostramos el nombre de la marca al lado del checkbox */}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}