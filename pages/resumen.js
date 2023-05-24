import ResumenProducto from "../components/ResumenProducto"
import useKiosco from "../hooks/useKiosco"
import Layout from '../layout/Layout'

export default function Resumen() {
   const { pedido } = useKiosco()
   return (
      <Layout pagina='Resumen'>
         <h1 className="text-4xl font-black">Resumen</h1>
         <p className="text-2xl my-10">Revisa tu pedido</p>
         {pedido.length === 0 ? (
            <p className="text-center text-2xl">No hay productos en tu pedido. Comienza agregando algunos en la seccion Menú.</p>
         ) : (
            pedido.map(producto => (
               <ResumenProducto
                  key={producto.id}
                  producto={producto}
               />
            ))
         ) }
      </Layout>
   )
}
