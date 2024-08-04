import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import JobCard from './JobCard';
import './Profile.css';

function Profile(currentUser){
    const [formData, setFormData] = useState(currentUser);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const {firstName, lastName, email} = formData;
        const editData = {firstName, lastName, email};
        try {
            await editProfile(editData);
        } catch (error){
            setError(error);
        }
    }

    return(
        <div className='Profile'>
            <form onSubmit={handleSubmit}>
                <h5>User Profile</h5>
                <div className="input-item">
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' name='username' value={FormData.username} disabled required/>
                </div>
                <div className='input-item'>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' value={FormData.firstName} onChange={handleChange} required/>
                </div>
                <div className='input-item'>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type='text' id='lastName' name='lastName' value={FormData.lastName} onChange={handleChange} required/>
                </div>
                <div className='input-item'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' name='email' value={FormData.email} onChange={handleChange} required/>
                </div>
            </form>
        </div>
    )
}

export default Profile;