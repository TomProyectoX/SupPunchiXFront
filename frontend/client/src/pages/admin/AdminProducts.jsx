import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import StatCard from "../../assets/components/admin/StatCard";
import FilterBar from "../../assets/components/admin/FilterBar";
import ProductTable from "../../assets/components/admin/ProductTable";
import Pagination from "../../assets/components/admin/Pagination";
import UpdateProductForm from "../../assets/components/admin/UpdateProductForm";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function AdminProducts() {

    const [productos, setProductos] = useState([])
    const [productoEditandoId, setProductoEditandoId] = useState(null); //estado del producto q esta editando para q react lo recuerde
    const [isEditing, setIsEditing] = useState(false); //controla si se muestra o no el formulario nasi
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

    const handleEdit = async (productid) => {
    setProductoEditandoId(productid);
    setIsEditing(true);

}
    const handleDelete = async (variantid, productid) => {

    try {
        console.log(variantid)

        const res = await fetch(
            `http://localhost:4002/variantes/${variantid}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NDk1NzgzLCJleHAiOjE3Nzk1ODIxODN9.u00VnW2W16ckgvRc0OWMvdQTcMkwnVxvCnWg1aGAkstgvkWsG6UKl8mdeWsr1c_W0mSlfYbJrrOUQBR6xTd2tg'
                }
            }
        );

        if(res.ok){
        eliminarvariantedelestado(variantid, productid)}

    } catch(err) {

        console.log(err);

    }
}


function eliminarvariantedelestado (varianteid, productid)
{
setProductos((productosanteriores) => {  ///si nosotros a un estado le pasamos UNA FUNCION A PELUCHE nos pone como PARAMETRO DE ESA FUNCION el estado (OP)
    const productosactualizados = productosanteriores.map((producto) => { 
        const vari = []; /// inicializamos el nuevo array que vamos a poner en producto, por cada producto vamos a hacer unas variantes nuevas
        if(producto.id == productid){ /// esto tiene sentido porq al final tenemos que buscar tambien de que producto se elimino la variante
        /// si no vamos a eliminar todas las variantes de productos que nada q ver (onda si elijo eliminar proteina vainilla, sin el if capaz eliminamos bcaa vainilla)
        
        producto.variantes.forEach((variante) => { /// hacemos un foreach pq como no vamos a estar modificando 
                                                 ///directamente el objeto donde se guardan las variantes
            if (variante.id !== varianteid){
                vari.push(variante) /// si no que directaemnte hacemos un array con todas las variantes
                                    // menos con la variante que coincida con el if (la eliminada)
            }
        }
    ) //aca termina el foreach
            
            return {...producto, variantes: vari} /// devuelvo el producto MODIFICADO modificandole las variantes, 
            // ...producto significa que me quedo con todos los atributos
            // originales del producto, es como hacer return{id : producto.id, categoria : producto.categoria, variantes: vari} 
            // pero de una forma mucho mas rapida, osea agarramos el producto anterior y le modificamos solo variantes:vari
    
    
        } // aca termina el if que compara los productos
      
        return producto ///en caso de que el producto no coincida con el q estamos buscando simplemente returneamos el producto Y ESTE SE GUARDA DIRECTAMENTE EN PRODUCTOS ACTUALIZADOS
                        // , no entramos al if 
                        // y returneamos el producto sin hacer modificaciones


}) // aca termina el .map que toma el nuevo array que va a ir al estado! y tambien que recorria el viejo array



return productosactualizados /// devuelve el nuevo ARRAY con los objetos que hicimos en el paso de arriba
/// quedaria algo asi [{producto}, {producto}] siempre el .map devuelve array
// aca estamos en la parte de setProductos, (ya estamos casi afuera de todo) asi que este return es el que toma .setProductos
}
)
}// y aca termina la funcion q engloba todo





  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <AdminSidebar />
      <AdminHeader />

      {/* Main Content */}
      <main className="ml-64 mt-20 px-8 py-8">
        {/* Statistics Cards */}
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

        {/* Filter Bar */}
        {/* <FilterBar /> */}

        {/* Product Table */}
        <ProductTable productos={productos} handleDelete={handleDelete} handleEdit={handleEdit} /> 
        {/* Y SI O SI QUE QUEDE CLARO ESTO MUY CLARO LE TENEMOS 
        QUE PASAR TODAS LAS FUNCIONES QUE VA A UTILIZAR EL HIJO MEDIANTE PROPS OSEA MEDIANTE PARAMETROS, SI TENES 
        50 COMPONENTES ENTRE MEDIO SE LO PASAS, SPOILER ALERT: PARA ESTO FUNCIONA REDUX Q LO VAMOS A VER EN 2 SEMANAS
        EL CONOCIMIENTO ES PODER. ANASHEII */}
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
                <UpdateProductForm producto={productoEditandoId} marcas={marcas} categorias={categorias} />
              </div>
            </div>
          </div>
        )}
        
        {/* Pagination */}
        {/* <Pagination /> */}
      </main>
    </div>
  );
}
