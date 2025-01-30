import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios-utils'

const fetchUsers = () => {
    return request({ url: '/users' })
}

export const useUsersData = (onSuccess, onError) => {
    return useQuery('users1', fetchUsers, {
        onSuccess,
        onError
        // select: data => {
        //   const UsersNames = data.data.map(user => user.first_name)
        //   return UsersNames
        // }
    })
}

const addUser = user => {
    // return axios.post('http://localhost:4000/rqusers', user)
    return request({ url: '/users', method: 'post', data: user })
}

export const useAddUserData = () => {
    const queryClient = useQueryClient()

    return useMutation(addUser, {
        // onSuccess: data => {
        //   /** Query Invalidation Start */
        //   // queryClient.invalidateQueries('super-heroes')
        //   /** Query Invalidation End */

        //   /** Handling Mutation Response Start */
        // queryClient.setQueryData('super-heroes', oldQueryData => {
        //   return {
        //     ...oldQueryData,
        //     data: [...oldQueryData.data, data.data]
        //   }
        // })
        //   /** Handling Mutation Response Start */
        // },
        /**Optimistic Update Start */
        onMutate: async newUser => {
            await queryClient.cancelQueries('users1')
            const previousUserData = queryClient.getQueryData('users1')
            queryClient.setQueryData('users1', oldQueryData => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newUser }
                    ]
                }
            })
            return { previousUserData }
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData('users1', context.previousUserData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('users1')
        }
        /**Optimistic Update End */
    })
}