import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import CuponForm from "../../assets/components/admin/cuponadmin/CuponForm";
import CuponList from "../../assets/components/admin/cuponadmin/CuponList";
import { fetchCupones, createCupon } from "../../../redux/cuponesSlice";
import { fetchProductos } from "../../../redux/productosSlice";

export default function Cupones() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.productos);
  const { cupones } = useSelector((state) => state.cupones);

  const [tipoCupon, setTipoCupon] = useState("descuento");
  const [descuento, setDescuento] = useState("");
  const [costo, setCosto] = useState("");
  const [variantesSeleccionadas, setVariantesSeleccionadas] = useState([]);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchProductos());
    dispatch(fetchCupones(token));
  }, [dispatch, token]);

  const resetForm = () => {
    setTipoCupon("descuento");
    setDescuento("");
    setCosto("");
    setVariantesSeleccionadas([]);
  };

  const handleVarianteChange = (varianteId) => {
    setVariantesSeleccionadas((prev) => {
      if (prev.includes(varianteId)) {
        return prev.filter((id) => id !== varianteId);
      }
      return [...prev, varianteId];
    });
  };

  const handleCreateCupon = async (e) => {
    e.preventDefault();

    const body = {
      costo: Number(costo),
    };

    if (tipoCupon === "descuento") {
      body.descuento = Number(descuento);
    } else {
      body.productosIds = variantesSeleccionadas;
    }

    const result = await dispatch(createCupon({ body, token }));
    if (!result.error) {
      resetForm();
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">
        <CuponForm
          tipoCupon={tipoCupon}
          setTipoCupon={setTipoCupon}
          descuento={descuento}
          setDescuento={setDescuento}
          costo={costo}
          setCosto={setCosto}
          productos={productos}
          variantesSeleccionadas={variantesSeleccionadas}
          handleVarianteChange={handleVarianteChange}
          handleCreateCupon={handleCreateCupon}
          resetForm={resetForm}
        />

        <CuponList cupones={cupones} />
      </main>
    </div>
  );
}
