import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import StatCard from "../../assets/components/admin/StatCard";
import InventoryTable from "../../assets/components/admin/InventoryTable";
import { fetchProductos } from "../../../redux/productosSlice";
import { updateVarianteStock, deleteVariante } from "../../../redux/variantesSlice";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const handleEdit = (productoId, variante, stockNuevo) => {
    dispatch(updateVarianteStock({
      id: Number(variante.id),
      stock: Number(stockNuevo),
      productoId,
      token,
    }));
  };

  const handleDelete = (varianteId, productoId) => {
    dispatch(deleteVariante({ varianteId, productoId, token }));
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total SKUs"
            value="1,248"
            unit="SKUs"
            trend="↑ 12 last month"
            borderColor="border-gray-700"
          />
          <StatCard
            title="Low Stock Items"
            value="42"
            unit="⚠"
            borderColor="border-yellow-500"
          />
          <StatCard
            title="Out of Stock"
            value="08"
            unit="🔴"
            borderColor="border-red-500"
          />
        </div>

        <InventoryTable productos={productos} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
    </div>
  );
}
