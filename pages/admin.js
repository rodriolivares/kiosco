import useSWR from 'swr'
import AdminLayout from '../layout/AdminLayout'
import axios from "axios"
import Orden from "../components/Orden"

export default function Admin() {
   const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

   const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})

   return (
      <AdminLayout pagina={'Admin'}>
         <h1 className="text-4xl font-black">Panel de Administración</h1>
         <p className="text-2xl my-10">Administras las ordenes</p>
         
         {data && data.length ? data.map(orden => (
            <Orden 
               key={data.id}
               orden={orden}
            />
         )) : <p>No hay ordenes pendientes</p> }
      </AdminLayout>
   )
}
