import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
interface Iprops {
    itemCurrent: Iusers | null,
    setItemCurrent: (v: any) => void,
    fetchAllUser: (a: any, b: any) => void,
    token: string | null,
    isModalOpen: boolean,
    setIsModalOpen: (v: boolean) => void,
    dataPaginate: any,
    // setDataPaginate: (v: any) => void
}

export interface Iusers {
    _id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    gender: string,
    address: string,
    role: string
}
const ModalUpdate = (props: Iprops) => {

    const { dataPaginate, itemCurrent, setItemCurrent, fetchAllUser, token, isModalOpen, setIsModalOpen } = props;



    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();

        setIsModalOpen(false);

        setItemCurrent(null)
        // form.resetFields();
    }

    useEffect(() => {
        if (itemCurrent) {
            form.setFieldsValue({
                _id: itemCurrent._id,
                name: itemCurrent.name,
                email: itemCurrent.email,
                password: itemCurrent.password,
                age: itemCurrent.age,
                gender: itemCurrent.gender,
                address: itemCurrent.address,
                role: itemCurrent.role
            })
        }
    }, [itemCurrent]);

    const handleFinish = async (val: Iusers) => {
        const { _id, name, email, password, age, gender, address, role } = val;


        const res = await fetch('http://localhost:8000/api/v1/users',
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                },
                body: JSON.stringify({ _id: itemCurrent?._id, name, email, password, age, gender, address, role })
            }
        )
        const d = await res.json();
        if (d.data) {
            fetchAllUser(dataPaginate.current, dataPaginate.pageSize);
            notification.success({
                message: 'Success update user',
            })
        } else {
            notification.error({
                message: 'Failled',
                description: d.message
            })
        }
    }


    return <>

        <Modal title="UPDATE USER" open={isModalOpen} onOk={() => {
            handleOk();
        }} onCancel={() => {
            setIsModalOpen(false);
            setItemCurrent(null);
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
                <Form.Item label='Password' name='password' >
                    <Input.Password disabled={itemCurrent ? true : false} />
                </Form.Item>
                <Form.Item label='Age' name='age' rules={[{ required: true, type: 'number' }]}>
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label='Gender' name='gender' rules={[{ required: true, type: 'string' }]}>
                    <Select placeholder='Chose gender'>
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
export default ModalUpdate;


