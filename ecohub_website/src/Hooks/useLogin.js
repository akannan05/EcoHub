import { useState } from 'react'
import { useAuthContext } from "../Hooks/useAuthContext"
// const backendURL = "http://localhost:4000";



 export const useLogin = () => {
    const [error, setError ] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        console.log("useLogin")
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({email, password,}))
        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok) {
            return {error: "Incorrect email or password"}
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            localStorage.setItem('userId', json.userId)
            
            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
 }