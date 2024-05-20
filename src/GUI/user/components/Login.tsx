import React, { Dispatch, SetStateAction, useState } from 'react'
import "../styles/login.css"
import IMG from "../styles/email.svg"
import { Auth } from '../page/LoginPage';
import { useAuth } from '../../../context/AuthContext';


type MyComponentProps = {
    isAuth: Auth;
    setIsAuth: Dispatch<SetStateAction<Auth>>;
}
const Login = ({ isAuth, setIsAuth }: MyComponentProps) => {

    return (
        <div id='login-Home' className={`${isAuth.open ? 'active' : ''}`}>
            <div className="login-container">

                <div className="login-img">
                    <img src={IMG} alt="IMG" />
                </div>

                <div className="login-text-btns">
                    <p>Welcome to my website</p>

                    <div className="login-btns" >
                        <a href="#!" className='login-login-btn' onClick={() => setIsAuth({ open: true, form: 'login' })}>Login</a>

                        <a href="#!" className='login-register-btn' onClick={() => setIsAuth({ open: true, form: 'register' })}>Register</a>
                    </div>
                    <span>Or via Social Media</span>
                    <div className="login-via-social">
                        <a href="">

                            <i className="fab fa-facebook-f"></i>
                        </a>

                        <a href="">



                            <i className="fab fa-google"></i>
                        </a>


                        <a href="">



                            <i className="fab fa-twitter"></i>
                        </a>



                    </div>
                </div>


            </div>



        </div>
    )
}

export default Login