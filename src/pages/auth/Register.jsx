import React from 'react';
import './index.scss';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import bot from '../../assets/avatar/bot.png';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/registerUser';
import { ImSpinner3 } from 'react-icons/im';

export const action = async ({ request }) => {
    const loginData = await request.formData();
    const email = loginData.get('email');
    const first_name = loginData.get('first_name');
    const last_name = loginData.get('last_name');
    const country = loginData.get('country');
    const password = loginData.get('password');
    const re_password = loginData.get('re_password');
    const contact = loginData.get('phone');
    const credentials = {
        email,
        first_name,
        last_name,
        country,
        password,
        re_password,
        contact,
    };
    try {
        const response = await registerUser(credentials);
        toast.success('Accout created successfuly!!', { theme: 'light' });
        return redirect('/login');
    } catch (error) {
        const errormsg = error.response.data.detail;
        toast.error(errormsg, { theme: 'light' });
        return null;
    }
};

export const RegisterPage = () => {
    const registerState = useNavigation();

    return (
        <div className="auth-container">
            <div className="login-container">
                <img src={bot} alt="image" />
                <div>
                    <div className="form-container">
                        <div>
                            <div className="login-header">
                                <h2 className="login-text">Register</h2>
                            </div>
                        </div>

                        <div>
                            <Form method="post" replace className="auth-form">
                                <input
                                    type="text"
                                    name="first_name"
                                    className="input"
                                    placeholder="First name"
                                    required
                                />

                                <input
                                    type="text"
                                    name="last_name"
                                    className="input"
                                    placeholder="Last name"
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="email"
                                    required
                                />
                                <input
                                    type="text"
                                    name="country"
                                    className="input"
                                    placeholder="country"
                                    required
                                />

                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="password"
                                    required
                                />

                                <input
                                    type="password"
                                    name="re_password"
                                    id="password"
                                    className="input"
                                    placeholder="confirm password"
                                    required
                                />
                                <button className="submit__btn">
                                    {registerState.state === 'idle' ? (
                                        'Sign Up'
                                    ) : (
                                        <ImSpinner3 className="spinner" />
                                    )}
                                </button>
                            </Form>
                            <div className="login-redirects">
                                <p className="">
                                    dont have an account ???{' '}
                                    <span>
                                        <Link to="/login">Login</Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
