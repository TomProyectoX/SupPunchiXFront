import { useEffect, useState } from "react";
import AdminSidebar from "../../assets/components/admin/AdminSidebar";
import AdminHeader from "../../assets/components/admin/AdminHeader";
import StatCard from "../../assets/components/admin/StatCard";
import InventoryTable from "../../assets/components/admin/InventoryTable";


export default function AdminProducts() {

    const [productos, setProductos] = useState([])


    useEffect(() => {
    const fetchproductos = async () => {
            const response = await fetch('http://localhost:4002/productos', {
                method : 'GET',
                headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NTUxNjgwLCJleHAiOjE3Nzk2MzgwODB9._dkcLHfXiCh1LvCmMt3NrM4PAHS_L2dZng2Pbdu17mehU_bFeYpX_mBvAD11tntIHAVeQg1Ri2sOrAxUuvlWIw',
      },});
      const data = await response.json()
      setProductos(data)
        }
   
      
  
      fetchproductos();


    }, [])

    const handleEdit = async (productoid ,varianteedit, stocknuevo) => {
      try{
        console.log(JSON.stringify(
          {
            id: Number(varianteedit.id),
            stock: Number(stocknuevo)
          }
        ))


      const response = await fetch('http://localhost:4002/variantes/stock',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBwdW5jaGkuY29tIiwiaWF0IjoxNzc5NTUxNjgwLCJleHAiOjE3Nzk2MzgwODB9._dkcLHfXiCh1LvCmMt3NrM4PAHS_L2dZng2Pbdu17mehU_bFeYpX_mBvAD11tntIHAVeQg1Ri2sOrAxUuvlWIw',
        },
        body: JSON.stringify(
          {
            id: Number(varianteedit.id),
            stock: Number(stocknuevo)
          }
        ),
      }
    );
    if (!response.ok){
      throw new Error("error")
    }
    editarstockenelestado(productoid ,varianteedit.id, stocknuevo)



  } catch(e){
    console.log(e)

  }
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


function editarstockenelestado (productoedit,varianteedit, stock){

setProductos((productosanteriores)=>{

  const productosactualizados = productosanteriores.map((producto)=>
  {
    if(producto.id == productoedit){
      producto.variantes.map((vari) => {
        if (vari.id == varianteedit){
          vari.stock = stock
        }
        return vari
      })
  }
  return producto
})
return productosactualizados


})


}




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
        <InventoryTable productos={productos} handleDelete={handleDelete} handleEdit={handleEdit} /> 
        {/* Y SI O SI QUE QUEDE CLARO ESTO MUY CLARO LE TENEMOS 
        QUE PASAR TODAS LAS FUNCIONES QUE VA A UTILIZAR EL HIJO MEDIANTE PROPS OSEA MEDIANTE PARAMETROS, SI TENES 
        50 COMPONENTES ENTRE MEDIO SE LO PASAS, SPOILER ALERT: PARA ESTO FUNCIONA REDUX Q LO VAMOS A VER EN 2 SEMANAS
        EL CONOCIMIENTO ES PODER. ANASHEII */}
        
        {/* Pagination */}
        {/* <Pagination /> */}
      </main>
    </div>
  );
}
