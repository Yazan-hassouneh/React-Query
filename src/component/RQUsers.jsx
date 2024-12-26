import axios from "axios"
import { useQuery } from "react-query"

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users')
}

function RQUsers() {
    const results = useQuery(
        'users', // key
        fetchUsers, // fetch function
        {
            cacheTime : 5000, // default 50,000
            staleTime : 30000 // prevent background fetch, default 0 
        })

    const {isLoading, data, isError, error} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query</b></h2>
            {data?.data.map(user => {
            return <div key={user.id}>{user.first_name}, {user.last_name}</div>
            })}
        </>
    )
}

export default RQUsers