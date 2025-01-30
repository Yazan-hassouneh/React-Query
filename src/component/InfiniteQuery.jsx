import axios from "axios"
import { Fragment } from "react"
import { useInfiniteQuery } from "react-query"

const fetchColors = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_per_page=10&_page=${pageParam}`)
}
function InfiniteQuery() {
    const results = useInfiniteQuery(
        ['colors'], // key
        fetchColors, // fetch function
        {
            getNextPageParam : (_lastPage, pages) => {
                if (pages.length < 12) {
                    return pages.length+1
                }else {
                    return undefined
                }
            }
        })

    const {isLoading, data, isError, error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage} = results
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>
    console.log(data);
    
    return (
        <>
            <h2>Colors Page Using <b>React-Query</b></h2>
            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>
            </div>
            {data?.pages?.map((group, i) => {
                return (
                    <Fragment key={i}>
                        {
                            group.data.data.map(color => {
                                return <div key={color.id}>{color.color}</div>
                            })
                        }
                    </Fragment>
                )
            })}
            <div>{isFetching && !isFetchingNextPage ? "Loading ..." : null}</div>
        </>
    )
}

export default InfiniteQuery