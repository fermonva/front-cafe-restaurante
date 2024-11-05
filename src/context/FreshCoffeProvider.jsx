import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import clienteAxios from "../config/axios";

const FreshCoffeContext = createContext();

const FreshCoffeProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    const TOKEN = localStorage.getItem('AUTH_TOKEN')

    useEffect(() => {
        const totalPedido = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(totalPedido)
    }, [pedido])

    const obtenerCategorias = async () => {
        try {
            const { data } = await clienteAxios.get(`/api/categorias`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Producto actualizado al pedido')
        } else {
            setPedido([...pedido, producto])
            toast.success('Producto agregado al pedido')
        }
    }

    const handleEditarPedido = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto eliminado del pedido')
    }

    const handleSubmitNuevaOrden = async () => {
        try {
            const { data } = await clienteAxios.post('/api/pedidos',
                {
                    total,
                    productos: pedido.map(producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad
                        }
                    })
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`

                    }
                }
            )
            setPedido([])
            toast.success(data.message)
            setTimeout(() => {
                setPedido([])
            }, 2000)
        } catch (error) {
            toast.error('Se produjo un error al enviar el pedido')
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async id => {
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            toast.success('Pedido completado')
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickProductoAgotado = async id => {
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            toast.success('Pedido completado')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FreshCoffeContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarPedido,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            {children}
        </FreshCoffeContext.Provider>

    )
}

export { FreshCoffeProvider };

export default FreshCoffeContext