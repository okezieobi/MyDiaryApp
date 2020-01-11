import React from 'react';
import { Header } from '../components';

export default class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
        }
    }

    render() {
        return (
            <div className=''>
                <Header headerClass='header' headerButtonClass='title-button' headerButtonTitle='Signout' buttonContextId='signout' />
                <main className='main'>
                    <section className='dashboard'>{this.state.token}</section>
                </main>
            </div>
        )
    }
}