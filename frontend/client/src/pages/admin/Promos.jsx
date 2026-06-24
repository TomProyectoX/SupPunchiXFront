import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductos } from "../../../redux/productosSlice";
import { fetchPromos, createPromo, updatePromo, deletePromo } from "../../../redux/promosSlice";

import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import PromoForm from "../../assets/components/admin/promoadmin/PromoForm";
import PromoList from "../../assets/components/admin/promoadmin/PromoList";

export default function Promos() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const productos = useSelector((state) => state.productos.productos);
  const promos = useSelector((state) => state.promos.promos);

  // Estos tres se quedan como estado local porque son solo datos del formulario,
  // no tiene sentido meterlos en el store global
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [editingPromoId, setEditingPromoId] = useState(null);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchProductos());
    dispatch(fetchPromos(token));
  }, [token]);

  const resetForm = () => {
    setEditingPromoId(null);
    setDescription("");
    setDiscount(0);
    setProductosSeleccionados([]);
  };

  const handleCheckboxChange = (idProducto) => {
    setProductosSeleccionados((prev) =>
      prev.includes(idProducto)
        ? prev.filter((id) => id !== idProducto)
        : [...prev, idProducto]
    );
  };

  const handleCreatePromo = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPromo({
        body: {
          description,
          discount: Number(discount),
          productosIds: productosSeleccionados,
        },
        token,
      })).unwrap();
      resetForm();
    } catch (error) {
      console.error("Error creando promo:", error);
    }
  };

  const handleEditPromo = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePromo({
        id: editingPromoId,
        body: {
          description,
          discount: Number(discount),
          // productosIds no va — el backend no lo acepta en el PUT
        },
        token,
      })).unwrap();
      resetForm();
    } catch (error) {
      console.error("Error editando promo:", error);
    }
  };

  const handleDeletePromo = async (promoId) => {
    try {
      await dispatch(deletePromo({ id: promoId, token })).unwrap();
    } catch (error) {
      console.error("Error eliminando promo:", error);
    }
  };

  const handleSelectPromoToEdit = (promo) => {
    setEditingPromoId(promo.id);
    setDescription(promo.description);
    setDiscount(promo.discount);
    setProductosSeleccionados(promo.productos.map((p) => p.idProducto));
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