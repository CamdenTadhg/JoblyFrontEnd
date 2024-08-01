import React, {useEffect, useState} from 'react';
import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import {v4 as uuid} from 'uuid';
import './JobList.css';

function JobList(){
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    //get a list of jobs from the API and set state appropriately
    useEffect(() => {
        async function getJobs() {
            console.log('starting getJobs')
            setIsLoading(true);
            let loadJobs = await JoblyApi.getAllJobs();
            console.log(loadJobs)
            setJobs(loadJobs);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    if (!currentUser){
        return <Navigate to='/'/>
    }
    
    if (isLoading){
        return (
            <div className='JobList'>
                <h3 className='JobList-text-loading'>Loading &hellip;</h3>
            </div>
        )}

    return(
        <div>
            <div className='JobList-search'>
                <SearchForm fields={['title', 'salary', 'equity']} setData={setJobs} type='job' />
            </div>
            <div className='JobList-jobs'>
                {jobs.map(job => (
                    <JobCard key={uuid()} title={job.title} salary={job.salary} equity={Boolean(job.equity)} company={job.companyName}/>
                ))}
            </div>
        </div>
    )
}

export default JobList;