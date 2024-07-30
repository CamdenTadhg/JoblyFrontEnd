import React from 'react';
import SearchBar from './SearchBar';
import JobCard from './JobCard';

function JobList(){
    return(
        <div>
            I am the job list page.
            <SearchBar />
            <JobCard />
        </div>
    )
}

export default JobList;