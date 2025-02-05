import { useEffect, useState } from 'react';
import {CanceledError} from '../services/api-client';
import userService, { User } from '../services/userService';
import useUsers from '../hooks/useUsers';


const Users = () => {
    const { users, error, loading, setUser, setError} = useUsers()
    
    const addUser = () => {
        const originalUsers = [...users]
        const hesam = {id: 0, name: 'hesam'}; 

        const request = userService.post(hesam)
        request
            .then(({ data: savedUser }) => {
                setUser([savedUser, ...users])
            })
            .catch(err => {
                setError(err.message)
                setUser(originalUsers)
            })
    }

    const deleteUser = (user: User) => {
        const originalUsers = [...users]

        setUser(users.filter(u => u.id !== user.id))

        const request = userService.delete(user.id)
        request
            .catch(err => {
                setError(err.message)
                setUser(originalUsers)
            })
    }

    const updateUser = (user: User) => {
        const originalUsers = [...users]
        const updatedUser = {...user, name: user.name + '!'}
        setUser(users.map(u => u.id === user.id ? updatedUser : u))

        userService.update(updatedUser)
            .catch(({message}) => {
                setError(message)
                setUser(originalUsers)
            })
    }



    return (
        <>
        {error && <div className='text-danger'>{error}</div>}
        {loading && <div className="spinner-border"></div>}
        <button onClick={addUser} className="btn btn-primary mb-3">Add</button>
            <ul className='list-group'>
                {users.map((user: any) => (
                    <li key={user.id} className='list-group-item d-flex justify-content-between'>{user.name}
                    <div>
                        <button onClick={() => updateUser(user)}
                        className="btn btn-outline-secondary mx-1">Update</button>
                        <button
                        onClick={() => deleteUser(user)}
                        className="btn btn-outline-danger">Delete</button>
                    </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Users;