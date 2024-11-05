import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export const AdminSidebar = () => {

    const { logout } = useAuth({ middleware: 'auth' })

    return (
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img
                    className="w-40"
                    src="/img/logo.svg"
                    alt="imagen logotipo"
                />
            </div>

            <nav className="flex flex-col p-4">
                <Link
                    className="font-bold text-lg"
                    to="/admin"
                >Ordenes</Link>
                <Link
                    className="font-bold text-lg"
                    to="/admin/productos"
                >Productos</Link>
            </nav>

            <div className="my-5 px-5">
                <button
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    )
}
