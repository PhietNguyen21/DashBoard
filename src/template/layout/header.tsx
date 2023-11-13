import React, { useState } from 'react'
import { AppstoreOutlined, UsergroupAddOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const Header = () => {
    const items: MenuProps['items'] = [
        {
            label: <Link to='/'>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={'/dashboard'}>Admin DashBoard</Link>,
            key: 'dashboard',
            icon: <UsergroupAddOutlined />,

        },

    ];
    const [current, setCurrent] = useState<string>('home');

    // const onClick: MenuProps['onClick'] = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    // };

    return <Menu onClick={(e: any) => {
        setCurrent(e.key)
    }} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Header