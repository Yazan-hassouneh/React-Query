import axios from "axios"
import { useQuery } from "react-query"
import PropTypes from 'prop-types'

const fetchUser = ({queryKey}) => {
    const firstName = queryKey[1]
    return axios.get(`http://localhost:4000/users?first_name=${firstName}`)
}
const fetchUserExperience = ({queryKey}) => {
    const userId = queryKey[1]
    return axios.get(`http://localhost:4000/experiences?userId=${userId}`)
}

function DependentQuery({userName}) {
    const results = useQuery(
        [`user${userName}`, userName], // key
        fetchUser, // fetch function
        )
    
    const {isLoading, data : user, isError, error} = results
    const userId = user?.data[0].id

    const experienceResult = useQuery(
        [`user${userId}`, userId], // key
        fetchUserExperience, // fetch function
        {
            enabled : !!userId
        }
        )
    const {data : userExperience} = experienceResult
    
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2>Super Heroes Page Using <b>React-Query</b></h2>
            {user?.data.map(user => {
                return <div key={user.id}>{user.first_name}, {user.last_name}</div>
            })}
            <ol>
                {userExperience?.data[0].experience?.map((experience, i) => {
                    return <li key={i}>{experience}</li>
                })}
            </ol>
        </>
    )
}

DependentQuery.propTypes = {
    userName: PropTypes.string.isRequired
}

export default DependentQuery