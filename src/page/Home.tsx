import React from 'react'
import { Form, Input, Checkbox, Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const navigate = useNavigate();


    const onFinish = async (values: FieldType) => {
        const res = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        const d = await res.json();
        if (d.data) {
            localStorage.setItem('access_token', JSON.stringify(d.data.access_token));
            notification.success({
                message: d.message

            })
            navigate('/dashboard')
        } else {
            notification.error({
                message: 'Fail Login',
                description: d.message
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // LOGIN

    return (

        <Form

            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000, marginTop: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    )
}
