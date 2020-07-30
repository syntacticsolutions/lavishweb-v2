import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Table } from 'antd';

import {LIST_USER_QUERY} from '../queries/user'
import {usePermsEffect} from '../utils'
import {useAuthUser} from '../context/user-context'

export default function UserAdmin ({history}) {
    const {data} = useQuery(LIST_USER_QUERY)
    const [user] = useAuthUser()

    usePermsEffect('admin', [user], () => {
        history.push(`/blog`)
    })

    return (
        <div className="admin-page">
            <h1>User Admin</h1>
            {
                data?.users && (
                    <Table
                        columns={config}
                        dataSource={data?.users}
                    />
                )
            }
        </div>
    )
}

const config = [
    {
        key: 'image',
        dataIndex: 'image',
        title: 'Avatar',
        render: url => (
            <figure>
                <img
                    src={
                        url ||
                            'https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg'
                    }
                    height="50px"
                    width="50px"
                    alt={url}
                />
            </figure>
          ),
    },
    {
        key: 'first_name',
        dataIndex: 'first_name',
        title: 'First Name'
    },
    {
        key: 'last_name',
        dataIndex: 'last_name',
        title: 'Last Name'
    },
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email'
    },
    {
        key: 'role',
        dataIndex: 'role',
        title: 'Role'
    }
]