import Image from "next/image"
import { useEffect, useState } from 'react'
import { formatearDinero } from '../helpers'
import useKiosco from "../hooks/useKiosco"
const Producto = ({producto}) => {
   const { nombre, imagen, precio } = producto
   const { handleSetProducto, handleChangeModal, pedido } = useKiosco()
   const [edicion, setEdicion] = useState(false);
   
   useEffect(() => {      
      if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
         setEdicion(true);
      } 
   }, [producto, pedido]);
   return (
      <div className="border p-3">
         <Image 
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen Platillo ${nombre}`}
            width={400}
            height={500}
         />
         <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
               {formatearDinero(precio)}
            </p>
            <button
               type="button"
               className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bolds"
               onClick={() => {
                  handleChangeModal()
                  handleSetProducto(producto)
               }}
            >
               {edicion ? 'Cambiar Cantidad' : 'Agregar'}
            </button>
         </div>
      </div>
   )
}

export default Producto