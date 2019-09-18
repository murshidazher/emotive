import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = (props) => {
    return ( 
        <div>
            
            <div className="input-group input--btn">
                        <input className="form-control" type="text" onChange={props.onInputChange} placeholder="Paste the Image url" />
                        <button type="button" className="btn" onClick={props.onSubmit}>Detect</button>
            </div>
        </div>       
    );

}

export default ImageLinkForm;