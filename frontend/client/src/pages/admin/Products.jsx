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
  const [isAdding, setIsAdding] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [flavours, setFlavours] = useState([]);
    useEffect(() => {
    const fetchproductos = async () => {
            const response = await fetch('http://localhost:4002/productos', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
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
        const fetchsabores= async () => {
            const response3 = await fetch('http://localhost:4002/sabores', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
      },});
      const data3 = await response3.json()
      setFlavours(data3)
      
      
        }
        fetchproductos();
        fetchcategorias();
        fetchmarcas();
        fetchsabores();
       
        

    }, [])

  const handleEdit = (producto) => {
    setProductoEditando(producto);
    setIsEditing(true);
  };

  const onSaved = (productoActualizado) => {
    console.log("[DEBUG] onSaved called with:", productoActualizado);
    console.log("[DEBUG] Current productos before update:", productos);
    
    setProductos((productosAnteriores) => {
      const productosActualizados = productosAnteriores.map((producto) => {
        if (producto.idProducto === productoActualizado.idProducto) {
          console.log("[DEBUG] Found matching product, replacing");
          return productoActualizado;
        }
        return producto;
      });
      console.log("[DEBUG] Updated productos state:", productosActualizados);
      return productosActualizados;
    });
    setIsEditing(false);
  };

  const savenewproducto = (productoNuevo) => {
    console.log("[DEBUG] savenewproducto called with:", productoNuevo);
    setProductos((productosAnteriores) => {
      const productosActualizados = [...productosAnteriores, productoNuevo];
      console.log("[DEBUG] Updated productos state:", productosActualizados);
      return productosActualizados;
    });
    setIsAdding(false);
  };


const handleDelete = async (producto) => {
    try{
        console.log(producto)
        const res = await fetch(
           `http://127.0.0.1:4002/productos/${producto.idProducto}`
        ,{
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NTUxNjgwLCJleHAiOjE3Nzk2MzgwODB9._dkcLHfXiCh1LvCmMt3NrM4PAHS_L2dZng2Pbdu17mehU_bFeYpX_mBvAD11tntIHAVeQg1Ri2sOrAxUuvlWIw'
                }
        }
        )
        if (!res.ok){
            throw new Error()
        }
        deleteproductofromestado(producto)

    } catch (e){
        console.log(e)
    }
}



function deleteproductofromestado (product) {
    setProductos((productosantiguos) => {
        const nuevosprodcutos = productosantiguos.filter((producto) =>  producto.idProducto !== product.idProducto)
        return nuevosprodcutos
    })




}


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

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Productos</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="rounded-md bg-[#CCFF00] px-4 py-2 text-sm font-black text-black transition-colors hover:bg-white"
          >
            + Add New Product
          </button>
        </div>

        <ProductsTable productos={productos} handleEdit={handleEdit} handleDelete={handleDelete} />

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
                  sabores={flavours}
                  onSaved={onSaved}
                  onClose={() => setIsEditing(false)}
                />
              </div>
            </div>
          </div>
        )}

        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-2xl">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="absolute -top-10 right-0 text-sm text-gray-300 hover:text-white"
              >
                Cerrar
              </button>

              <div className="rounded-2xl border border-gray-700 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.65)]">
               
                <UpdateProductForm
                  marcas={marcas}
                  categorias={categorias}
                  sabores={flavours}
                  onSaved={savenewproducto}
                  onClose={() => setIsAdding(false)}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}