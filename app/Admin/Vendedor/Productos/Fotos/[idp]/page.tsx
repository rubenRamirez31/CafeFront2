'use client'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState } from "react"
import { storage } from '@/app/services/fbConfig'

import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2'
import { Props } from '../../Actualizar/[idp]/page'
import axios from 'axios'

const FotosProductosPage = ({params} :  Props) => {

    const [foto, setfoto] = useState<File>()
    const [transferencia, setTransferencia] = useState(0)
    const [subiendo, setSubiendo] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const asignarFoto = (files: any) => {
        if (files[0].size < 10000000) {
            setfoto(files[0]);
        }
        else {
            Swal.fire({
                title: "Atención",
                text: "La imagen supera el tamaño",
                icon: "error"
            });
        }
    }

    const subirImagen = () => {
        if (foto) {
            const name = foto.name
            const storageRef = ref(storage, `imagenes/${name}`)
            const uploadTask = uploadBytesResumable(storageRef, foto)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setSubiendo(true);
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setTransferencia(Math.round(progress)) // to show progress upload

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {

                    Swal.fire({
                        title: "Atención",
                        text: "Error a la hora de subir una foto",
                        icon: "warning"
                    });
                    setSubiendo(false);
                    setTransferencia(0);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        axios.post("http://localhost:5195/Productos/GuardarFoto",{
                            "imagenUrl" : url,
                            "idProducto" : params.idp
                        }).then((res) =>{
                            setImageUrl(url)
                            setSubiendo(false);
                            setTransferencia(0);
                            Swal.fire({
                                title: "Atención",
                                text: res.data.mensaje,
                                icon: "success"
                            });
                        }) ;
                       
                    })
                },
            )
        } else {
            Swal.fire({
                title: "Atención",
                text: "NO se ha seleccionado ninguna foto",
                icon: "warning"
            });
        }

    }

    return (
        <div>



            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="input-group">
                        <input type="file" className="form-control"
                            aria-describedby="inputGroupFileAddon04" aria-label="Upload"
                            onChange={files => asignarFoto(files.target.files)}
                        />
                    </div>
                </div>
            </div>

            {
                subiendo ?
                    <div className="progress" role="progressbar" aria-label="Success example" >
                        <div className="progress-bar bg-success" style={{ width: `${transferencia}%` }}>{`${transferencia}%`}</div>
                    </div>
                    :
                    <h1></h1>
            }

            <div className="row mt-4">
                <div className="col-md-6 offset-md-3 text-center">
                    <button className='btn btn-danger' onClick={subirImagen}>Subir imagen</button>
                </div>
            </div>
        </div>
    )
}

export default FotosProductosPage