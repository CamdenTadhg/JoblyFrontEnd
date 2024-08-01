import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import './LoginForm.css';

function LoginForm({login}) {
    //set initial state for form
    const initialState = {
        username: '',
        password: ''
    }

    //set state for form inputs
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = formData;
        await login(loginData);
        navigate('/');
    };

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <h5>Login Form</h5>
                <div className='input-item'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} required/>
                </div>
                <div className='input-item'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' name='password' value={FormData.password} onChange={handleChange} required />
                </div>
                <button className='submit-button'>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;