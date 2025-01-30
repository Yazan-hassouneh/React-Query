import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"

const fetchUsers = ({queryKey}) => {
    const id = queryKey[1]
    return axios.get(`http://localhost:4000/animals?id=${id}`)
}

function AnimalsDetails() {
        /* 
            I had the same problem, and I fixed when adding IDs of string type on my JSON file.
            From what I've seen, it seems like, when you fetch with the ID parameter, such as GET users/1234, 
            it reads "1234" as a string, and since your objects have IDs of type number, it does not consider a match, so you get no response.
            Therefore, a fix for that problem would be changing the way you register IDs from objects into your JSON database, from number type IDs to string type IDs.
        */
        const queryClient = useQueryClient()
        const {id} = useParams()
        const results = useQuery(
                [`animal${id}`, id], // key
                fetchUsers, // fetch function
                {
                    initialData : () => {
                        const animal = queryClient.getQueryData('animalsInitial')?.data?.find(animal => animal.id == id)
                        if(animal) return {data : animal}
                        return undefined
                    }
                }
            )
        
        const {isLoading, data, isError, error} = results        

        if (isLoading) return <h2>Loading...</h2>
        if (isError) return <h2>{error.message}</h2>
    
        return (
            <h2>
                {data?.data[0]?.id} - {data?.data[0]?.animal}
            </h2>
        )
}

export default AnimalsDetails