import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Table } from '../components/common/table';

import {LIST_USER_QUERY, LIST_ROLES_QUERY} from '../queries'

import {usePermsEffect} from '../utils'

export default function UserAdmin ({history}) {
    const {data} = useQuery(LIST_USER_QUERY)
    const {data: roles} = useQuery(LIST_ROLES_QUERY)

    usePermsEffect('manage-users', () => {
        history.push(`/blog`)
    })

    return (
        <div className="admin-page">
            <h1>Users</h1>
            {
                data?.users && (
                    <Table
                        configs={config}
                        data={data.users}
                        maxHeight="500px"
                    />
                )
            }
            <h1>Roles</h1>
            {
                roles?.roles && (
                    <Table
                        configs={rolesConfig}
                        data={roles.roles} 
                        maxHeight="500px"
                    />
                )
            }
        </div>
    )
}

const config = [
    {
        key: 'image',
        title: 'Avatar',
        content: ({image}) => (
            <figure>
                <img
                    src={
                        image ||
                            'https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg'
                    }
                    height="50px"
                    width="50px"
                    alt="user-avatar"
                />
            </figure>
          ),
    },
    {
        key: 'first_name',
        title: 'First Name'
    },
    {
        key: 'last_name',
        title: 'Last Name'
    },
    {
        key: 'email',
        title: 'Email',
    },
    {
        key: 'role',
        title: 'Role',
        content: function Content({role}) {

        }
    }
]

const rolesConfig = [
    {
        title: 'Role',
        key: 'title',
    },
    {
        title: 'Permissions',
        key: 'permissions',
    }
]