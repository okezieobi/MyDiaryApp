import React from 'react';
import { Header, Button } from '../components';
import Helpers from '../helpers';

const redirectToSignup = () => Helpers.loadPage('/signup');
const redirectToSignin = () => Helpers.loadPage('/signin');

const Home = () => 
            <div className='backgroundOne'>
                <Header headerClick={redirectToSignin} headerClass='home-header' headerButtonClass='home-title-button' headerButtonTitle='Have an account ? Signin' />
                <main className='home-main'>
                    <h3 className='home-intro' >Welcome to My Diary, an safe, fast and reliable online journal to pen your thoughts</h3>
                    <Button click={redirectToSignup} buttonType='click' buttonClass='home-button' buttonTitle='Create an account now' />
                </main>
            </div>

export default Home;