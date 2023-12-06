import Link from "next/link"

const NotAccessPage = () => {
  return (
    <div className="text-center text-danger">
        <h2>El recurso solicitado no existe</h2>
        <Link href="/app" className="btn btn-dark">
            Regresar a Productos
        </Link>
    </div>
  )
}

export default NotAccessPage