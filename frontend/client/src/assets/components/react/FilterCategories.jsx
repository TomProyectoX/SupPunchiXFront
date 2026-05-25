import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

function FilterCategories({type}) {
  const [opciones, setOpciones] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const getcategorias = async () => {
    const response = await fetchWithAuth('http://localhost:4002/categories', {
      method: 'GET',
    }, () => token, navigate);
    const data = await response.json();
    const categories = data.map(categorie => categorie.description);
    setOpciones(categories);
  };

  const getmarcas = async () => {
    const response = await fetchWithAuth("http://localhost:4002/marcas", {
      method: 'GET',
    }, () => token, navigate);
    const data = await response.json();
    const marques = data.map(mark => mark.nombre);
    setOpciones(marques);
  };

  // ✅ useEffect ÚNICO que ejecuta según el type
  useEffect(() => {
    if (!token) return;

    if (type === "categoria") {
      getcategorias();
    }
    if (type === "marca") {
      getmarcas();
    }
  }, [type, token, navigate]); // Dependencia: si cambia type, ejecuta de nuevo

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-black uppercase text-[#CCFF00]">
        {type === "categoria" ? "Category" : "Marca"}
      </h3>

      <div className="flex flex-col gap-2">
        {opciones.map((category, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded-none border-[#262626] !bg-black checked:!bg-[#CCFF00] text-black focus:ring-0 cursor-pointer" 
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterCategories;