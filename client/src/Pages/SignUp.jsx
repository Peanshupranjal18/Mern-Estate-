/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
    // object and function for the state
    const [formData, setFormData] = useState({});
    // for the error we encounter during signup
    const [error, setError] = useState(null);
    // loading actions
    const [loading, setLoading] = useState(false);
    //initialisation of the navigate function which we have imported
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            // spread operator so that we do not loose track
            ...formData,
            // which one is changing
            [e.target.id]: e.target.value,
        });
    };
    // function handlesubmit which takes an eventlistener as
    // an input for the function respectively
    const handleSubmit = async (e) => {
        // prevent refreshing the page when we submit the form
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // change to string
                body: JSON.stringify(formData),
            });
            // response -> user crested successful
            const data = await res.json();

            console.log(data);

            // suceess == false data messadge should be returnde

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            // everythin is fine
            setError(null);
            // navigate to the sign in page
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='text'
                    placeholder='Username'
                    className='border p-3 rounded-lg'
                    // handling
                    id='username'
                    // eventlistener
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder='E-mail'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={handleChange}
                />

                <button
                    // when the loading will be false the button will be disabled
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                {/* router */}
                <Link to={'/sign-in'}>
                    <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}