import React, {useEffect, useState} from 'react';
import './SearchForm.css';
import JoblyApi from './JoblyApi';

function SearchForm({fields, setCompanies, setIsLoading}){
    console.log('rerendering SearchForm');
    const initialState = {
        name: '',
        minEmployees: '',
        maxEmployees: ''
    };
    const [formData, setFormData] = useState(initialState);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //handle change to form entries, searching as the user types
    const handleChange = (event) => {
        console.log('FORM DATA CHANGED')
        const {name, value} = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log('use effect called');
        async function getFilteredCompanies(data){
            let filteredCompanies = await JoblyApi.getFilteredCompanies(data);
            setCompanies(filteredCompanies);
        }
        getFilteredCompanies(formData);
    }, [formData])

    return(
        <div className='SearchForm'>
            <form className='SearchForm-form'>
                {fields.map(field => (
                    <div key={field} className='input-item'>
                        <label key={field} htmlFor={field}>{capitalize(field)}:</label>
                        <input name={field} id={field} value={formData[field]} onChange={handleChange}/>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default SearchForm;