import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, boundingBox}) => {
    return ( 
        <div>
            <div className="img__wrapper">
                <img id='inputImg' className="img" src={imageUrl} alt='' />
                <div className="bounding-box" style={{top: boundingBox.topRow, right: boundingBox.rightCol, left: boundingBox.leftCol, bottom: boundingBox.bottomRow}}>

                </div>

                <img className="clip-svg" alt="Harry Potter" />

                <svg width="0" height="0">
                <defs>
                    <clipPath id="myClip">
                    <circle cx="150" cy="150" r="50" />
  <rect x="150" y="150" width="100" height="100" />
</clipPath>
                </defs>
                </svg>

                <div className="face__wrapper">
                <div className="face">

                  </div> 
                </div>
                </div>
        
            
        </div>       
    );

}

export default FaceRecognition;