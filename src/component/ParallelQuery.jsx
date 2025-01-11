import axios from "axios"
import { useQuery } from "react-query"

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users')
}
const fetchAnimals = () => {
    return axios.get('http://localhost:4000/animals')
}

function ParallelQuery() {

    const UsersResults = useQuery(
        'ParallelUsers', // key
        fetchUsers, // fetch function
        {
        })

    const {isLoading : loadingUsers, data : users} = UsersResults

    const AnimalsResults = useQuery(
        'ParallelAnimals', // key
        fetchAnimals, // fetch function
        {
        })

    const {isLoading : loadingAnimals, data : animals} = AnimalsResults

    return (
        <div>ParallelQuery</div>
    )
}

export default ParallelQuery