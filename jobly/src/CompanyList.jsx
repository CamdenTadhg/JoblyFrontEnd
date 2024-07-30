import React from 'react';
import SearchBar from './SearchBar';
import CompanyCard from './CompanyCard';

function CompanyList(){
    return(
        <div>
            <SearchBar />
            <CompanyCard />
        </div>
    )
}

export default CompanyList;