import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const fetchUsers = ({queryKey}) => {
    const id = queryKey[1]
    return axios.get(`http://localhost:4000/users?id=${id}`)
}

function UserDetails() {
    /* 
        I had the same problem, and I fixed when adding IDs of string type on my JSON file.
        From what I've seen, it seems like, when you fetch with the ID parameter, such as GET users/1234, 
        it reads "1234" as a string, and since your objects have IDs of type number, it does not consider a match, so you get no response.
        Therefore, a fix for that problem would be changing the way you register IDs from objects into your JSON database, from number type IDs to string type IDs.
    */
    const {id} = useParams()

    const results = useQuery(
        [`user${id}`, id], // key
        fetchUsers, // fetch function
        )
    
    const {isLoading, data, isError, error} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <h2>
            {data.data[0].id} - {data.data[0].first_name}
        </h2>
    )
}

export default UserDetails



