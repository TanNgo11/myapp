import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Role } from '../../../models/Role';

type UserLogin = {
    username: string;
    password: string;
}

function LoginForm() {

    const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm<UserLogin>({
        mode: 'all',

    });

    const { login, role, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: UserLogin) => {
        try {
            const userRoles = await login(data.username, data.password);
            if (userRoles?.includes(Role.ADMIN)) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };




    return (
        <div className="login">
            <strong>Sign in</strong>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                {/* email */}
                <label htmlFor="">Email <span>*</span> </label>
                <div className="login-input-group">
                    <i className='far fa-paper-plane'></i>
                    <input {...register("username")} type="text" required />
                </div>

                <label htmlFor="">Password <span>*</span> </label>
                <div className="login-input-group">
                    <i className='fas fa-lock'></i>
                    <input {...register("password")} type="password" required />
                </div>

                <div className='btns'>
                    <button type="submit">Login</button>
                </div>
                <a href="#!" className='forget'>Forget your password?</a>

            </form>

            <div className="intro-text">
                <span>Welcome to this site</span>

            </div>
        </div>

    )
}

export default LoginForm