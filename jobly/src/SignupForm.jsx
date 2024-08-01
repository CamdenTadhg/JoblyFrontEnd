import React, {useState} from 'react';
import './SignupForm.css'

function SignupForm() {
    //set initial state for form
    const initialState = {
        username: '',
        password: '',
        retypePassword: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = () => {}

    return (
        <div className='SignupForm'>
            <form onSubmit={handleSubmit}>
                <h5>Signup Form</h5>
                <div className="input-item">
                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username' name='username' value={FormData.username} onChange={handleChange}/>
                </div>
                <div className="input-item">
                    <label htmlFor='password'>Password:</label>
                    <input type='text' id='password' name='password' value={FormData.password} onChange={handleChange}/>
                </div>
                <div className="input-item">
                    <label htmlFor='retypePassword'>Retype Password:</label>
                    <input type='text' id='retypePassword' name='retypePassword' value={FormData.retypePassword} onChange={handleChange}/>
                </div>
                <div className="input-item">
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' value={FormData.firstName} onChange={handleChange}/>
                </div>
                <div className="input-item">
                    <label htmlFor='lastName'>Last Name: </label>
                    <input type='text' id='lastName' name='lastName' value={FormData.lastName} onChange={handleChange}/>
                </div>
                <div className="input-item">
                    <label htmlFor='email'>Email: </label>
                    <input type='text' id='email' name='email' value={FormData.email} onChange={handleChange}/>
                </div>
            </form>
        </div>
    )
}

export default SignupForm;