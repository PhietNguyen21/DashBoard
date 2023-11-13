
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Divider, notification, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ModalAddNew from '../component/modal/modalAddnew';
import ModalUpdate from '../component/modal/modalUpdate';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
const DashBoard = () => {

    const [lstUser, setLstUser] = useState<object[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const times = [500];

    const token: (string | null) = JSON.parse(localStorage.getItem('access_token') || '');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalUpdate, setIsModalUpdate] = useState(false);

    const [itemCurrent, setItemCurrent] = useState(null);



    const [dataPaginate, setDataPaginate] = useState({
        "current": 1,
        "pageSize": 5,
        "pages": 4,
        "total": 8
    });

    const confirm = (e: any) => {
        console.log(e);

    };

    useEffect(() => {
        if (token !== '') {
            fetchAllUser(dataPaginate.current, dataPaginate.pageSize)
        }
    }, [dataPaginate.current])


    const fetchAllUser = async (current: number, pageSize: number) => {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/v1/users?current=${current}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        })

        const d = await res.json();
        if (d.data.result) {
            setLstUser(d.data.result);
            setDataPaginate(d.data.meta)
        } else {
            notification.error(d.message)
        }
        setTimeout(() => {
            setLoading(false);
        }, times[0])


    }

    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        });
        const d = await res.json();
        if (d.data) {
            fetchAllUser(dataPaginate?.current, dataPaginate?.pageSize);
            notification.success({
                message: 'Delete user success'
            })
        } else {
            notification.error({
                message: 'Delete faillen',
                description: d.message
            })
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'age',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },

        {
            title: 'Action',
            key: 'action',
            width: '25%',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => {
                        console.log('RECORD', record)
                        setIsModalUpdate(true);
                        setItemCurrent(record);
                    }}>Edit</Button>
                    <Popconfirm
                        title="Delete the user"
                        description={`Are you sure to delete this user name = ${record.name} ?`}
                        onConfirm={(e) => {

                            handleDelete(record._id);
                        }}
                        placement='topLeft'
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data: any = lstUser

    return (
        <div style={{ textAlign: 'center' }}>
            <Divider orientation='center' orientationMargin={50}>Mananger User</Divider>


            <Button onClick={() => {
                setIsModalOpen(true)
            }} style={{ marginBottom: 20 }} type='primary'>Add new user</Button>

            <Table locale={{
                emptyText: <></>
            }}
                pagination={
                    loading ? false : {
                        pageSize: dataPaginate.pageSize,
                        current: dataPaginate.current,
                        total: dataPaginate.total,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: async (current, pageSize) => {
                            await setDataPaginate({ ...dataPaginate, current: current, pageSize: pageSize })
                            fetchAllUser(current, pageSize);
                        },
                        showSizeChanger: true,

                    }
                }
                loading={loading} rowKey={'_id'} columns={loading ? [] : columns} dataSource={loading ? [] : data} />

            <ModalAddNew fetchAllUser={fetchAllUser} token={token} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <ModalUpdate dataPaginate={dataPaginate} setItemCurrent={setItemCurrent} itemCurrent={itemCurrent} fetchAllUser={fetchAllUser} token={token} isModalOpen={isModalUpdate} setIsModalOpen={setIsModalUpdate} />
        </div>
    )
}

export default DashBoard