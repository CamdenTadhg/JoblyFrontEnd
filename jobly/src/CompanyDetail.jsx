import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import './CompanyDetail.css';

function CompanyDetail(){
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    const {handle} = useParams();

    //get the company's details from the API
    useEffect(() => {
        async function getCompany(handleData) {
            setIsLoading(true);
            let loadCompany = await JoblyApi.getCompany(handleData);
            setCompany(loadCompany)
            setIsLoading(false);
        }
        getCompany(handle);
    },[]);

    if (!currentUser){
        return <Navigate to='/'/>
    }

    if (isLoading) {
        return (
            <div className='CompanyDetail'>
                <h3 className='CompanyDetail-text-loading'>Loading &hellip;</h3>
            </div>
        )
    }
    return(
        <div className='CompanyDetail'>
            <div className='CompanyDetail-detail'>
                <h3>{company.name}</h3>
                <p>{company.description}</p>
                <p>Employees: {company.numEmployees}</p>
            </div>
            <div className='CompanyDetail-jobs'>
                {company.jobs.map(job => {
                    return(<JobCard title={job.title} salary={job.salary} equity={job.equity}/>)
                    
                })}
            </div>
        </div>

    )
}

export default CompanyDetail;