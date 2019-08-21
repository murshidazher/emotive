import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = (props) => {
    return ( 
        <div>
            <p>
                {'This magic brain will detect your faces in the picture. Give it an image '}
            </p>
            <div>
                <input type='text' onChange={props.onInputChange} />
                <button onClick={props.onSubmit}>Detect</button>
            </div>
        </div>       
    );

}

export default ImageLinkForm;