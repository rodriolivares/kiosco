import Head from 'next/head'
import Image from 'next/image'
import Producto from "../components/Producto.js"
import useKiosco from "../hooks/useKiosco.js"
import Layout from '../layout/Layout.js'

export default function Home() {
  const { categoriaActual } = useKiosco()
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black ">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">Elige y personaliza tu pedido a continuacion</p>
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>

    </Layout>
  )
}