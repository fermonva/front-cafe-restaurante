import { formatearMoneda } from "../helpers";
import useFreshCoffe from "../hooks/useFreshCoffe";

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useFreshCoffe()
    const { id, imagen, nombre, precio } = producto

    return (
        <div className="border p-3 shadow bg-white">
            <img
                className="w-full"
                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}.jpg`}
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">
                    {nombre}
                </h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearMoneda(precio)}
                </p>

                {botonAgregar && (
                    <button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        type="button"
                        onClick={() => { handleClickModal(); handleSetProducto(producto); }}
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        type="button"
                        onClick={() => handleClickProductoAgotado(id)}
                    >
                        Producto Agotado
                    </button>
                )}
            </div>
        </div>
    )
}
