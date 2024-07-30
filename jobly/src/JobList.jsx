import React from 'react';
import SearchForm from './SearchForm';
import JobCard from './JobCard';

function JobList(){
    return(
        <div>
            I am the job list page.
            <SearchForm />
            <JobCard />
        </div>
    )
}

export default JobList;