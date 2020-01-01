import React from 'react';
import { Header } from '../components';

export default class UserDashboard extends React.Component {

    render() {
        return (
            <div className=''>
                <Header headerButtonTitle='Signout' buttonContextId='signout' />
                <main></main>
            </div>
        )
    }
}