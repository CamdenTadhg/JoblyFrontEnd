import React from 'react';
import './ApplyButton.css';

function ApplyButton({applied}){
    if (applied){
        return (<button disabled>Applied</button>)
    }
    return(
        <button>Apply</button>
    )
}

export default ApplyButton;