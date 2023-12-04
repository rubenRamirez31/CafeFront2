'use client'
import { Props } from "../../Actualizar/[idp]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductoEliminarPage = ({params} : Props) => {

    const router = useRouter();
    const [producto, setProducto] = useState<string>("")

    const eliminarProducto = () =>{
        axios.delete(`http://localhost:5195/Productos?id=${params.idp}`).then(res => {
            router.push("/Productos");
            router.refresh();
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:5195/Productos/GetProductoId?id=${params.idp}`).then(res => {
            console.log(res.data)
            setProducto(res.data.nombre);
        });
    }, [])
    
    
  return (
    <div className="text-center">
        <h1 className="text-danger">Estas seguro que desea eliminar {producto}</h1>
        <button className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
        <Link href="/Productos" className="btn btn-dark">Regresar</Link>
    </div>
  )
}

export default ProductoEliminarPage