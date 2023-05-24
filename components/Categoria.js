import Image from "next/image"
import useKiosco from "../hooks/useKiosco";

const Categoria = ({ categoria }) => {
   const { nombre, icono, id } = categoria;
   const { categoriaActual, handleClickCategoria } = useKiosco()
   return (
      <div 
         className={`${categoriaActual?.id === id && "bg-amber-400"} flex items-center gap-4 w-full border p-5 hover:bg-amber-400  hover:cursor-pointer`}
         onClick={() => handleClickCategoria(id)}
      >
         <Image 
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt="Imagen Icono"
         />
         <button
            type="button"
            className="text-2xl font-bold"
         >
            {nombre}
         </button>
      </div>
   )
}

export default Categoria