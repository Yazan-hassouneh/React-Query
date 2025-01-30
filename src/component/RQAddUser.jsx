import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAddUserData, useUsersData } from '../hooks/useUserData'

function RQAddUser() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')

    const onSuccess = data => {
        console.log({ data })
    }

    const onError = error => {
        console.log({ error })
    }

    const { isLoading, data, isError, error, refetch } = useUsersData(
        onSuccess,
        onError
    )

    const { mutate: addUser } = useAddUserData()

    const handleAddUserClick = () => {
        console.log(first_name);
        
        const user = { id : `${data?.data.length+1}` ,first_name ,last_name }
        addUser(user)
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>React Query Add New User Page</h2>
            <div>
                <input
                type='text'
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                />
                <input
                type='text'
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                />
                <button onClick={handleAddUserClick}>Add User</button>
            </div>
            <button onClick={refetch}>Fetch Users</button>
                {data?.data.map(user => {
                return (
                <div key={user.id}>
                    <Link to={`/userDetails/${user.id}`}>{user.id} {user.first_name}</Link>
                </div>
                )
            })}
        </>
    )
}

export default RQAddUser