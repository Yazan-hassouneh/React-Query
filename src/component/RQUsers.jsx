import axios from "axios"
import { useQuery } from "react-query"

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users')
}

function RQUsers() {

    const onSuccess = () => {
        console.log("Data fetched Successfully");
    }
    const onError = () => {
        console.log("Encountering Error");
    }

    const results = useQuery(
        'users1', // key
        fetchUsers, // fetch function
        {
            cacheTime : 5000, // default 50,000
            staleTime : 30000, // prevent background fetch, default 0 
            refetchOnMount : true, // default value true
            refetchOnWindowFocus : true, // default value true
            //refetchInterval : 2000, // Refetch Data every ****ms  , used when the data change a lot (in seconds ) like stoke prices . 
            onSuccess : onSuccess,
            onError : onError
        })

    const {isLoading, data, isError, error, refetch} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query</b></h2>
            <button onClick={refetch}>Refetch Data</button>
            {data?.data.map(user => {
            return <div key={user.id}>{user.first_name}, {user.last_name}</div>
            })}
        </>
    )
}

export default RQUsers