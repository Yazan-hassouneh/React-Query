import axios from "axios"
import { useQuery } from "react-query"

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users')
}

function RQUsers2() {
    const select = (data) => {
        const selectedArray = data.data.map((user) => {
            return { 
                id : user.id,
                firstName : user.first_name
            }
        })
        return selectedArray
    }

    const results = useQuery(
        'users2', // key
        fetchUsers, // fetch function
        {   
            select : select
        })

    const {isLoading, data, isError, error} = results
    console.log(data);
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query 2</b></h2>
            {data.map(user => {
            return <div key={user.id}>{user.id} - {user.firstName}</div>
            })}
        </>
    )
}

export default RQUsers2