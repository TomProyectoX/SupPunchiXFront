import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import PromoForm from "../../assets/components/admin/promoadmin/PromoForm";
import PromoList from "../../assets/components/admin/promoadmin/PromoList";
import { fetchPromos, addPromo, updatePromo, deletePromo } from "../../../redux/promosSlice";
import { fetchProductos } from "../../../redux/productosSlice";

export default function Promos() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.productos);
  const { promos } = useSelector((state) => state.promos);

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [editingPromoId, setEditingPromoId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductos());
    dispatch(fetchPromos(token));
  }, [dispatch, token]);

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
    const body = {
      description,
      discount: Number(discount),
      productosIds: productosSeleccionados,
    };
    await dispatch(addPromo({ body, token }));
    resetForm();
  };

  const handleEditPromo = async (e) => {
    e.preventDefault();
    const body = {
      description,
      discount: Number(discount),
      productosIds: productosSeleccionados,
    };
    await dispatch(updatePromo({ id: editingPromoId, body, token }));
    resetForm();
  };

  const handleDeletePromo = (promoId) => {
    dispatch(deletePromo({ id: promoId, token }));
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
