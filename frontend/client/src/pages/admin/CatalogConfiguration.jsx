import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import EntityFormCard from "../../assets/components/admin/EntityFormCard";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export default function CatalogConfiguration() {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [sabores, setSabores] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasRes = await fetchWithAuth('http://localhost:4002/categories', { method: 'GET' }, () => token, navigate);
        const marcasRes = await fetchWithAuth('http://localhost:4002/marcas', { method: 'GET' }, () => token, navigate);
        const saboresRes = await fetchWithAuth('http://localhost:4002/sabores', { method: 'GET' }, () => token, navigate);

        const categoriasData = await categoriasRes.json();
        const marcasData = await marcasRes.json();
        const saboresData = await saboresRes.json();

        setCategorias(categoriasData);
        setMarcas(marcasData);
        setSabores(saboresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, navigate]);

  // CATEGORÍAS
  const handleAddCategoria = async (nombre) => {
    try {
      const response = await fetchWithAuth("http://localhost:4002/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: nombre }),
      }, () => token, navigate);

      if (response.ok) {
        const newCategoria = await response.json();
        setCategorias([...categorias, newCategoria]);
      }
    } catch (error) {
      console.error("Error adding categoria:", error);
    }
  };

  const handleEditCategoria = async (id, nombre) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: nombre }),
      }, () => token, navigate);

      if (response.ok) {
        setCategorias(
          categorias.map((c) =>
            c.id === id ? { ...c, description: nombre } : c
          )
        );
      }
    } catch (error) {
      console.error("Error editing categoria:", error);
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }, () => token, navigate);

      if (response.ok) {
        setCategorias(categorias.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting categoria:", error);
    }
  };

  // MARCAS
  const handleAddMarca = async (nombre) => {
    try {
      const response = await fetchWithAuth("http://localhost:4002/marcas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      }, () => token, navigate);

      if (response.ok) {
        const newMarca = await response.json();
        setMarcas([...marcas, newMarca]);
      }
    } catch (error) {
      console.error("Error adding marca:", error);
    }
  };

  const handleEditMarca = async (id, nombre) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/marcas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      }, () => token, navigate);

      if (response.ok) {
        setMarcas(
          marcas.map((m) =>
            m.idMarca === id ? { ...m, nombre } : m
          )
        );
      }
    } catch (error) {
      console.error("Error editing marca:", error);
    }
  };

  const handleDeleteMarca = async (id) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/marcas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }, () => token, navigate);

      if (response.ok) {
        setMarcas(marcas.filter((m) => m.idMarca !== id));
      }
    } catch (error) {
      console.error("Error deleting marca:", error);
    }
  };

  // SABORES
  const handleAddSabor = async (nombre) => {
    try {
      const response = await fetchWithAuth("http://localhost:4002/sabores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      }, () => token, navigate);

      if (response.ok) {
        const newSabor = await response.json();
        setSabores([...sabores, newSabor]);
      }
    } catch (error) {
      console.error("Error adding sabor:", error);
    }
  };

  const handleEditSabor = async (id, nombre) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/sabores/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      }, () => token, navigate);

      if (response.ok) {
        setSabores(
          sabores.map((s) =>
            s.idSabor === id ? { ...s, nombre } : s
          )
        );
      }
    } catch (error) {
      console.error("Error editing sabor:", error);
    }
  };

  const handleDeleteSabor = async (id) => {
    try {
      const response = await fetchWithAuth(`http://localhost:4002/sabores/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }, () => token, navigate);

      if (response.ok) {
        setSabores(sabores.filter((s) => s.idSabor !== id));
      }
    } catch (error) {
      console.error("Error deleting sabor:", error);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#CCFF00] uppercase tracking-widest">
            Catálogo
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Gestiona categorías, marcas y sabores de tus productos
          </p>
        </div>

        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categorías */}
          <EntityFormCard
            entityName="Categoría"
            items={categorias}
            onAdd={handleAddCategoria}
            onEdit={handleEditCategoria}
            onDelete={handleDeleteCategoria}
          />

          {/* Marcas */}
          <EntityFormCard
            entityName="Marca"
            items={marcas}
            onAdd={handleAddMarca}
            onEdit={handleEditMarca}
            onDelete={handleDeleteMarca}
          />

          {/* Sabores */}
          <EntityFormCard
            entityName="Sabor"
            items={sabores}
            onAdd={handleAddSabor}
            onEdit={handleEditSabor}
            onDelete={handleDeleteSabor}
          />
        </div>
      </main>
    </div>
  );
}
