import { useEffect, useState } from "react"
import userService, { User } from "../services/userService"
import { CanceledError } from "../services/api-client"
import { set } from "immer/dist/internal.js"

const useUsers = () => {
    const [users, setUser] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const { request, cancel } = userService.getAll<User>()
        request
            .then(res => {
                setUser(res.data)
                setError(null)
            })
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            }).finally(() => {
                setLoading(false)
            })

        return () => cancel()
    }, [])

    return { users, error, loading, setUser, setError }
}

export default useUsers;