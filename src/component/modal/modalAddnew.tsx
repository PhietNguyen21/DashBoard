import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
interface Iprops {
    fetchAllUser: any,
    token: string | null,
    isModalOpen: boolean,
    setIsModalOpen: (v: boolean) => void
}

export interface Iusers {
    name: string,
    email: string,
    password: string,
    age: number,
    gender: string,
    address: string,
    role: string
}
const ModalAddNew = (props: Iprops) => {

    const { fetchAllUser, token, isModalOpen, setIsModalOpen } = props;

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();

        setIsModalOpen(false);

        form.resetFields();
    }

    const handleFinish = async (val: Iusers) => {
        const { name, email, password, age, gender, address, role } = val;


        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
                body: JSON.stringify({ name, email, password, age, gender, address, role })
            }
        )
        const d = await res.json();
        if (d.data) {
            fetchAllUser();
            notification.success({
                message: 'Success add new user',

            })
        } else {
            notification.error({
                message: 'Failled',
                description: d.message
            })
        }
    }

    return <>

        <Modal title="ADD NEW USER" open={isModalOpen} onOk={() => {
            handleOk();
        }} onCancel={() => {
            setIsModalOpen(false);
        }}>
            <Form form={form} labelCol={{ span: 4 }} layout='horizontal' onFinish={(val) => {
                handleFinish(val)
            }} >
                <Form.Item label='Name' name='name' rules={[{ required: true, type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Email' name='email' rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true, type: 'string' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label='Age' name='age' rules={[{ required: true, type: 'number' }]}>
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label='Gender' name='gender' rules={[{ required: true, type: 'string' }]}>
                    <Select defaultValue='Chose gender'>
                        <Select.Option value={'MALE'}>MALE</Select.Option>
                        <Select.Option value={'FEMALE'}>FEMALE</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Address' name='address' rules={[{ required: true, type: 'string' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Role' name='role' rules={[{ required: true, type: 'string' }]}>
                    <Select placeholder='Chose Role'>
                        <Select.Option value={'USER'}>USER</Select.Option>
                        <Select.Option value={'ADMIN'}>ADMIN</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    </>
}
export default ModalAddNew;


