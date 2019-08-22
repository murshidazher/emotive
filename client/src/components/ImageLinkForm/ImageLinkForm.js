import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = (props) => {
    return ( 
        <div>
            <p>
                {'This magic brain will detect your faces in the picture. Give it an image '}
            </p>
            <div className="input-group input--btn">
                        <input className="form-control" type="text" onChange={props.onInputChange} placeholder="Paste the Image url" />
                        <button type="button" className="btn" onClick={props.onSubmit}>Detect</button>
            </div>
        </div>       
    );

}

export default ImageLinkForm;