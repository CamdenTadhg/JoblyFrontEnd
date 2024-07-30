import React, {useEffect, useState} from 'react';
import SearchForm from './SearchForm';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import './JobList.css';

function JobList(){
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    //get a list of jobs from the API and set state appropriately
    useEffect(() => {
        async function getJobs() {
            setIsLoading(true);
            let loadJobs = await JoblyApi.getAllJobs();
            setJobs(loadJobs);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    if (isLoading){
        return (
            <div className='JobList'>
                <h3 className='JobList-text-loading'>Loading &hellip;</h3>
            </div>
        )}

    return(
        <div>
            <div className='JobList-search'>
                <SearchForm fields={['title', 'salary', 'equity']} />
            </div>
            <div className='JobList-jobs'>
                {jobs.map(job => (
                    <JobCard title={job.title} salary={job.salary} equity={job.equity}/>
                ))}
            </div>
        </div>
    )
}

export default JobList;