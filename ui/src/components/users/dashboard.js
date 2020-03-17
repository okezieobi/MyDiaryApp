import React from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardComponent } from '../components';

const UserDashboard = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');

    if (token) {
        return <DashboardComponent token={token} />
    } else {
        return history.push('/signin');
    }
}

export default UserDashboard;
