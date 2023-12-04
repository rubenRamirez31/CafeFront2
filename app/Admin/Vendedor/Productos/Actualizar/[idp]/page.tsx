'use client'
import { ICategoria } from '@/app/Client/models/ICategorias';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

export interface Props {
  params: { idp: number }
}

const ProductosActualizarPage = ({ params }: Props) => {


  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5195/Categorias').then(res => {
      setCategorias(res.data);
      axios.get(`http://localhost:5195/Productos/GetProductoId?id=${params.idp}`).then(prod => {
        setValue("id", prod.data.id);  
        setValue("nombre", prod.data.nombre);
        setValue("descripcion", prod.data.descripcion);
        setValue("precio", prod.data.precio);
        setValue("idCategoria", prod.data.idCategoria);
      } )
    })
  }, [])

  const onSubmit = handleSubmit(async (formData) => {
    
    await axios.put("http://localhost:5195/Productos", formData);
    router.push("/Productos");
    router.refresh();
  })

  return (
    <>
    
    <form onSubmit={onSubmit}>
      <input type="hidden" {...register("id")} />
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Nombre</label>
          <input type="text" className="form-control"  {...register("nombre")} />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Descripcion</label>
          <textarea className="form-control" {...register("descripcion")}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Precio</label>
          <input type="text" className="form-control" {...register("precio")} />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Categorías</label>
          <select className="form-select" {...register("idCategoria")}>
            {categorias.map((e: ICategoria) =>
              <option key={e.id} value={e.id}>{e.categoria}</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6">
          <button type="submit" className="btn btn-warning">Actualizar</button>
          <Link href="/Productos" className="btn btn-dark">Regresar</Link>
        </div>
      </div>
    </form>
    </>
    
  )
}

export default ProductosActualizarPage