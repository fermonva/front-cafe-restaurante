import { useAuth } from "../hooks/useAuth";
import useFreshCoffe from "../hooks/useFreshCoffe";
import Categoria from "./Categoria";

export default function Sidebar() {

  const { categorias } = useFreshCoffe()
  const { logout, user } = useAuth({ middleware: 'auth' })

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img
          className="w-40"
          src="/img/logo.svg"
          alt="Imagen Logo"
        />
      </div>

      <p className="my-10 text-xl text-center">{user?.name}</p>
      <div className="mt-10">
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>

      <div className="my-5 px-5">
        <button
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  )
}

