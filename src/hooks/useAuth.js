import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    const API_ROUTE = '/api/user';
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()
    const [hasShownError, setHasShownError] = useState(false);

    const { data: user, error, mutate } = useSWR(API_ROUTE, () =>
        clienteAxios.get(API_ROUTE, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
            .catch(error => {

                if (error) {
                    throw Error(error?.response?.data?.errors)
                }
            })
    )

    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const registro = async (datos, setErrores) => {

        try {
            const { data } = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
            navigate('/auth/login')
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }
        if (middleware === 'auth' && error && !hasShownError) {
            navigate('/auth/login')
            console.log(error);
            setHasShownError(true);
        }
    }, [user, error, hasShownError, middleware, url])

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}
