import useSWR from 'swr';
import Producto from "../components/Producto";
import clienteAxios from '../config/axios';

export const Productos = () => {

  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios.get('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 1000 })

  if (isLoading) return 'Cargando...'

  return (
    <>
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10">
        Maneja la disponibilidad desde aqui.
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        {data?.data.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
            botonDisponible={true}
          />
        ))}
      </div>
    </>
  )
}
