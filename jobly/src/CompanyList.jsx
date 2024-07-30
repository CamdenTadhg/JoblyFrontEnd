import React, {useEffect, useState} from 'react';
import SearchForm from './SearchForm';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import './CompanyList.css';

function CompanyList(){
    const [isLoading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([]);

    //get the list of companies from the API and set state appropriately
    useEffect(() => {
        async function getCompanies() {
            setIsLoading(true);
            let loadCompanies = await JoblyApi.getAllCompanies();
            setCompanies(loadCompanies);
            setIsLoading(false);
        }
        getCompanies();
    }, []);


    if (isLoading) {
        return (
            <div className='CompanyList'>
                <h3 className='CompanyList-text-loading'>Loading &hellip;</h3>
            </div>
        )
    }

    return(
        <div className="CompanyList">
            <div>
                <div className='CompanyList-search'>
                    <SearchForm setData={setCompanies} fields={['name', 'minEmployees', 'maxEmployees']}/>
                </div>
                <div className='CompanyList-text'>
                    {companies.map(company => (
                        <CompanyCard key={company.handle} handle={company.handle} name={company.name} description={company.description} emps={company.numEmployees}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default CompanyList;