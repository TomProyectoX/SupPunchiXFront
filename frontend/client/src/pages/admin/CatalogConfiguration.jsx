import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import EntityFormCard from "../../assets/components/admin/EntityFormCard";
import { fetchCategorias, addCategoria, updateCategoria, deleteCategoria } from "../../../redux/categoriasSlice";
import { fetchMarcas, addMarca, updateMarca, deleteMarca } from "../../../redux/marcasSlice";
import { fetchSabores, addSabor, updateSabor, deleteSabor } from "../../../redux/saboresSlice";

export default function CatalogConfiguration() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { categorias } = useSelector((state) => state.categorias);
  const { marcas } = useSelector((state) => state.marcas);
  const { sabores } = useSelector((state) => state.sabores);

  useEffect(() => {
    console.log('Token in CatalogConfiguration:', );
    dispatch(fetchCategorias(token));
    dispatch(fetchMarcas(token));
    dispatch(fetchSabores(token));
  }, [dispatch, token]);

  // CATEGORÍAS
  const handleAddCategoria = (nombre) => {
    dispatch(addCategoria({ body: { description: nombre }, token }));
  };

  const handleEditCategoria = (id, nombre) => {
    dispatch(updateCategoria({ id, description: nombre, token }));
  };

  const handleDeleteCategoria = (id) => {
    dispatch(deleteCategoria({ id, token }));
  };

  // MARCAS
  const handleAddMarca = (nombre) => {
    dispatch(addMarca({ body: { nombre }, token }));
  };

  const handleEditMarca = (id, nombre) => {
    dispatch(updateMarca({ id, nombre, token }));
  };

  const handleDeleteMarca = (id) => {
    dispatch(deleteMarca({ id, token }));
  };

  // SABORES
  const handleAddSabor = (nombre) => {
    dispatch(addSabor({ body: { nombre }, token }));
  };

  const handleEditSabor = (id, nombre) => {
    dispatch(updateSabor({ id, nombre, token }));
  };

  const handleDeleteSabor = (id) => {
    dispatch(deleteSabor({ id, token }));
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
