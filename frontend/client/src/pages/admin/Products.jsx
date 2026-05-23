import { useEffect, useState } from "react";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import StatCard from "../../assets/components/admin/StatCard";
import ProductsTable from "../../assets/components/admin/ProductsTable";
import UpdateProductForm from "../../assets/components/admin/UpdateProductForm";

export default function Products() {
  const [productos, setProductos] = useState([])
  const [productoEditando, setProductoEditando] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

    useEffect(() => {
    const fetchproductos = async () => {
            const response = await fetch('http://localhost:4002/productos', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYW5jaGl0b0BnbWFpbC5jb20iLCJpYXQiOjE3Nzk0NzIxNTcsImV4cCI6MTc3OTU1ODU1N30.nLkxCU2v0lDuEiF7aaEg94lo--wIVh-GRu94W4coSYKb86VKdRumk9M7NFtFvpbVI-sR4t1ebiuTnYuOC0dhUA',
      },});
      const data = await response.json()
      setProductos(data)
        }
    const fetchcategorias = async () => {
            const response1 = await fetch('http://localhost:4002/categories', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
      },});

      const data1 = await response1.json()
      console.log(data1)
      setCategorias(data1)
        }
         const fetchmarcas = async () => {
            const response2 = await fetch('http://localhost:4002/marcas', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
      },});
      const data2 = await response2.json()
      setMarcas(data2)
        }
        fetchproductos();
        fetchcategorias();
        console.log(categorias)
        fetchmarcas();


    }, [])

  const handleEdit = (producto) => {
    setProductoEditando(producto);
    setIsEditing(true);
  };

  const handleSaved = async () => {
    const response = await fetch("http://localhost:4002/productos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYW5jaGl0b0BnbWFpbC5jb20iLCJpYXQiOjE3Nzk0NzIxNTcsImV4cCI6MTc3OTU1ODU1N30.nLkxCU2v0lDuEiF7aaEg94lo--wIVh-GRu94W4coSYKb86VKdRumk9M7NFtFvpbVI-sR4t1ebiuTnYuOC0dhUA",
      },
    });

    const data = await response.json();
    setProductos(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 mt-20 px-8 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Productos"
            value={productos.length.toString()}
            unit="items"
            borderColor="border-gray-700"
          />
          <StatCard
            title="Marcas"
            value={String(new Set(productos.map((producto) => producto.marca?.nombre || producto.marca)).size)}
            unit="brands"
            borderColor="border-green-500"
          />
          <StatCard
            title="Categorías"
            value={String(new Set(productos.map((producto) => producto.categoria?.description || producto.categoria)).size)}
            unit="types"
            borderColor="border-yellow-500"
          />
        </div>

        <ProductsTable productos={productos} handleEdit={handleEdit} />

        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-2xl">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="absolute -top-10 right-0 text-sm text-gray-300 hover:text-white"
              >
                Cerrar
              </button>

              <div className="rounded-2xl border border-gray-700 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.65)]">
                <UpdateProductForm
                  producto={productoEditando}
                  marcas={marcas}
                  categorias={categorias}
                  onSaved={handleSaved}
                  onClose={() => setIsEditing(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}