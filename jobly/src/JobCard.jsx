import React from 'react';
import ApplyButton from './ApplyButton';
import {Card, CardTitle, CardBody, CardText} from 'reactstrap';
import './JobCard.css';

function JobCard({title, salary, equity}){
    return(
        <Card className="JobCard-card">
            <CardBody>
                <CardTitle><b>{title}</b></CardTitle>
                <CardText>
                    <div>Salary: {salary}</div>
                    <div>Equity: {equity}</div>
                </CardText>
                <ApplyButton/>
            </CardBody>

        </Card>
    )
}

export default JobCard;