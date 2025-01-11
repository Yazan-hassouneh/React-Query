import axios from "axios"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users')
}

function RQUsers3() {

    const results = useQuery(
        'users3', // key
        fetchUsers, // fetch function
        {   
        })

    const {isLoading, data, isError, error} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query 3</b></h2>
            <ol>
                {data?.data.map(user => {
                return <li key={user.id}><Link to={`/userDetails/${user.id}`}>{user.first_name}, {user.last_name}</Link></li>
                })}
            </ol>
        </>
    )
}

export default RQUsers3