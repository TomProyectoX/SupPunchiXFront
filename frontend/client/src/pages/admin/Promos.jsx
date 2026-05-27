import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import PromoForm from "../../assets/components/admin/promoadmin/PromoForm";
import PromoList from "../../assets/components/admin/promoadmin/PromoList";

export default function Promos() {

  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [promos, setPromos] = useState([]);

  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);

  const [editingPromoId, setEditingPromoId] = useState(null);

  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {

    if (!token) return;

    fetchProductos();
    fetchPromos();

  }, [token]);

  const fetchProductos = async () => {

    try {

      const response = await fetchWithAuth(
        "http://localhost:4002/productos",
        {
          method: "GET",
        },
        () => token,
        navigate
      );

      const data = await response.json();

      setProductos(data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchPromos = async () => {

    try {

      const response = await fetchWithAuth(
        "http://localhost:4002/promos",
        {
          method: "GET",
        },
        () => token,
        navigate
      );

      const data = await response.json();

      setPromos(data);

    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {

    setEditingPromoId(null);

    setDescription("");

    setDiscount(0);

    setProductosSeleccionados([]);
  };

  const handleCheckboxChange = (idProducto) => {

    setProductosSeleccionados((prev) => {

      if (prev.includes(idProducto)) {
        return prev.filter((id) => id !== idProducto);
      }

      return [...prev, idProducto];
    });
  };

  const handleCreatePromo = async (e) => {

    e.preventDefault();

    try {

      const response = await fetchWithAuth(
        "http://localhost:4002/promos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            discount: Number(discount),
            productosIds: productosSeleccionados,
          }),
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        throw new Error("Error creando promo");
      }
      resetForm();

      fetchPromos();

    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPromo = async (e) => {

    e.preventDefault();

    try {

      const response = await fetchWithAuth(
        `http://localhost:4002/promos/${editingPromoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            discount: Number(discount),
            productosIds: productosSeleccionados,
          }),
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        throw new Error("Error editando promo");
      }

      resetForm();

      fetchPromos();

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePromo = async (promoId) => {

    try {

      const response = await fetchWithAuth(
        `http://localhost:4002/promos/${promoId}`,
        {
          method: "DELETE",
        },
        () => token,
        navigate
      );

      if (!response.ok) {
        throw new Error("Error eliminando promo");
      }

      fetchPromos();

    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectPromoToEdit = (promo) => {

    setEditingPromoId(promo.id);

    setDescription(promo.description);

    setDiscount(promo.discount);

    setProductosSeleccionados(
      promo.productos.map((p) => p.idProducto)
    );
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">

      <AdminSidebar />

      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">

        <PromoForm
          editingPromoId={editingPromoId}
          description={description}
          setDescription={setDescription}
          discount={discount}
          setDiscount={setDiscount}
          productos={productos}
          productosSeleccionados={productosSeleccionados}
          handleCheckboxChange={handleCheckboxChange}
          handleCreatePromo={handleCreatePromo}
          handleEditPromo={handleEditPromo}
          resetForm={resetForm}
        />

        <PromoList
          promos={promos}
          handleDeletePromo={handleDeletePromo}
          handleSelectPromoToEdit={handleSelectPromoToEdit}
        />

      </main>
    </div>
  );
}