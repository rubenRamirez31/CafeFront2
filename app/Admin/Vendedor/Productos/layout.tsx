const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div>
        <h3 className="text-danger text-center">
            Productos Disponibles
        </h3>
        {children}
    </div>
  )
}

export default layout