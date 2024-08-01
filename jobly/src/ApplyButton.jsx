import React from 'react';
import './ApplyButton.css';

function ApplyButton({applied}){
    if (applied){
        return (<button className='ApplyButton' disabled>Applied</button>)
    }
    return(
        <button className='ApplyButton'>Apply</button>
    )
}

export default ApplyButton;