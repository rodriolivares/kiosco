import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const KioscoContext = createContext()
const KioscoProvider = ({children}) => {
   const [categorias, setCategorias] = useState([]);
   const [categoriaActual, setCategoriaActual] = useState({});
   const [producto, setProducto] = useState({});
   const [modal, setModal] = useState(false);
   const [pedido, setPedido] = useState([]);
   const [nombre, setNombre] = useState('');
   const [total, setTotal] = useState(0);

   const router = useRouter()

   const obtenerCategorias = async () => {
      try {
         const { data } = await axios('/api/categorias')
         setCategorias(data)
      } catch (error) {
         console.log(error.response.data);
      }
   }

   useEffect(() => {
      obtenerCategorias()
   }, []);
   useEffect(() => {
      setCategoriaActual(categorias[0])
   }, [categorias]);
   useEffect(() => {
      const nuevoTotal = Number( ( pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0 ) ).toFixed(2) )
      setTotal(nuevoTotal)
   }, [pedido]);

   const handleClickCategoria = id => {
      const categoria = categorias.filter( cat => cat.id === id )
      setCategoriaActual(categoria[0]);
      router.push('/')
   }

   const handleSetProducto = producto => {
      setProducto(producto)
   }

   const handleChangeModal = () => {
      setModal(!modal)
   }

   const handleAgregarPedido = ({categoriaId, ...producto}) => {
      if(pedido.some(productoState => productoState.id === producto.id)) {
         const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
         setPedido(pedidoActualizado);
         toast.success('¡Cambio guardado correctamente!')
      } else {
         setPedido([...pedido, producto]);
         toast.success('¡Agregado al Pedido!')
      }
      setModal(false)
   }

   const handleEditarCantidades = id => {
      const productoActualizar = pedido.filter(producto => producto.id === id)
      setProducto(productoActualizar[0])
      setModal(!modal)
   }

   const handleEliminarProducto = id => {
      const pedidoActualizado = pedido.filter(producto => producto.id !== id)
      setPedido(pedidoActualizado)
   }
   
   const colocarOrden = async e => {
      e.preventDefault();
      try {
         await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
          
         setCategoriaActual(categorias[0]);
         setPedido([]);
         setNombre('');
         setTotal(0);

         toast.success('Tu pedido realizado correctamente. ¡Que lo disfrutes!')

         setTimeout(() => {
            router.push('/')
         }, 3000)
      } catch (error) {
         console.log(error.response.data);
      }
   }

   return (
      <KioscoContext.Provider
         value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
         }}
      >
         {children}
      </KioscoContext.Provider>
   )
}
export {
   KioscoProvider
}
export default KioscoContext