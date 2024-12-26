import axios from "axios"
import { useEffect, useState } from "react"

function Users() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/users')
        .then(res => {
            setData(res.data)
            setIsLoading(false)
            setError('')
        })
        .catch(error => {
            setError(error.message)
            setIsLoading(false)
        }) 
    }, [])

    if (isLoading) return <h2>Loading...</h2>
    if (error) return <h2>{error}</h2>

    return (
        <>
            <h2>Super Heroes Page</h2>
            {data.map(user => {
            return <div key={user.id}>{user.first_name}, {user.last_name}</div>
            })}
        </>
    )
}

export default Users