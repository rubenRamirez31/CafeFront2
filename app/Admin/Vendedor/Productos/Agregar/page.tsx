'use client';
import { ICategoria } from "@/app/models/ICategorias";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react"


const AgregarProductosPage = async () => {

    const { data: session, status } = useSession();
    const [categorias, setCategorias] = useState<ICategoria[]>([]);

    useEffect(() => {

        if (session?.user.token) {
            fetch('http://localhost:8080/Categorias', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.token}`,
                },
            })
                .then(response => response.json())
                .then(json => setCategorias(json))
                .catch(error => console.error('Error fetching products:', error));
        }


    }, [session]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('http://localhost:8080/Productos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${session?.user.token}`
            },
            body: JSON.stringify({
                nombre: formData.get("nombre"),
                descripcion: formData.get("descripcion"),
                precio: formData.get("precio"),
                idCategoria: formData.get("idcategoria")
            })
        });

        const data = await response.json()
        alert(data.mensaje);
    }


    return (
        <>
            <form className="mt-3" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="nombre" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Descripcion</label>
                        <textarea className="form-control" name="descripcion"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Precio</label>
                        <input type="text" name="precio" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Categorías</label>
                        <select className="form-select" name="idcategoria">
                            {categorias.map((e: ICategoria) =>
                                <option key={e.idCategoria} value={e.idCategoria}>{e.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AgregarProductosPage