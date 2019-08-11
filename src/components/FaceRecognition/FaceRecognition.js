import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, boundingBox}) => {
    return ( 
        <div>
            <div className="img__wrapper">
                <img id='inputImg' className="img" src={imageUrl} alt='' />
                <div className="bounding-box" style={{top: boundingBox.topRow, right: boundingBox.rightCol, left: boundingBox.leftCol, bottom: boundingBox.bottomRow}}></div>
            </div>
            
        </div>       
    );

}

export default FaceRecognition;