import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const fetchUsers = () => {
    return axios.get('http://localhost:4000/animals')
}

function InitialQueryData() {

    const results = useQuery(
        'animalsInitial', // key
        fetchUsers, // fetch function
        {
        })

    const {isLoading, data, isError, error} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query</b></h2>
            <ol>
                {data?.data.map(animal => {
                    return <li  key={animal.id}><Link to={`/animalDetails/${animal.id}`}>{animal.animal}, {animal.scientific_name}</Link></li>
                })}
            </ol>
        </>
    )
}

export default InitialQueryData