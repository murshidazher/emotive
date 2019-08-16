import React from 'react';
import './Rank.css';


const Rank = ({entries}) => {
    return ( 
        <div>
            <div>
                {'Your current entry count is '}
            </div>
            <div>
                {entries}
            </div>
        </div>       
    );

}

export default Rank;