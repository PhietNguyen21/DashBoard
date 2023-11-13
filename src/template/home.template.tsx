import React, { useState } from 'react';
import { Home } from '../page/Home';
import { Outlet } from 'react-router-dom';

const HomeTemplate = () => {
    return <>
        <Outlet />
    </>
}

export default HomeTemplate;