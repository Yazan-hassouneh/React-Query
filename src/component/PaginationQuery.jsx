import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"

const fetchColors = ({queryKey}) => {
    const pageNumber = queryKey[1]
    return axios.get(`http://localhost:4000/colors?_per_page=10&_page=${pageNumber}`)
}

function PaginationQuery() {
    const [pageNumber, setPageNumber] = useState(1)
    const results = useQuery(
        ['colors', pageNumber], // key
        fetchColors, // fetch function
        {
            keepPreviousData : true // Keep Previous Data Until the next fetch is done
        })

    const {isLoading, data, isError, error, isFetching} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>
    
    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query</b></h2>
            <div>
                <button onClick={() => setPageNumber(prev => prev - 1)} disabled={pageNumber == 1}>Previous</button>
                <button onClick={() => setPageNumber(prev => prev + 1)} disabled={pageNumber == data?.data.Last}>Next</button>
                {isFetching && "Loading"}
            </div>
            {data?.data.data.map(color => {
                return <div key={color.id}>{color.color}</div>
            })}
        </>
    )
}

export default PaginationQuery