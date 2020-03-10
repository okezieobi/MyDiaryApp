import React from 'react';
import { DashboardComponent } from '../components';

const UserDashboard = () => {
    const token = localStorage.getItem('token');

        return <DashboardComponent token={token} />
}

export default UserDashboard;
