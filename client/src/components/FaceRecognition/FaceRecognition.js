import React, {Component} from 'react';
import './FaceRecognition.css';


class FaceRecognition extends Component {

    constructor() {
        super();
        this.state = {
            src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'

          };

          this.myRef = React.createRef();
    }

   


/* 
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'

  */


    render() {
        const {imageUrl, boundingBox} = this.props;

        return ( 
            <div>
                <div className="img__wrapper">
                    <img id='inputImg' className="img" src={imageUrl} alt='' width='500px' heigh='auto' />
                    
                    <div className="bounding-box" style={{top: boundingBox.topRow, right: boundingBox.rightCol, left: boundingBox.leftCol, bottom: boundingBox.bottomRow}}></div>
    
    
                    <div className="">
    
                    </div>
    
                    <div className="outer-div">
                        {/* <div className="inner-div" style={{background: `url(${imageUrl}) -${boundingBox.topRow}px -${boundingBox.leftCol}px -${boundingBox.topRow}px`}}> */}
                        <div className="inner-div" style={{background: `url(${this.state.src}) ${392.31978}px -${164.84566}px`, backgroundSize: '200px'}}>
    
    {/*                     {leftCol: 164.84566, topRow: 138.088245, rightCol: 179.34146499999997, bottomRow: 392.31978}
    
    
     */}
     
                        </div>
                    </div>
    
                 
    
                    
                    </div>


                    <div>

                    <img ref={this.myRef} alt="clipper" id="preview" />
        
                    </div>
            
                
            </div>       
        );
    }
    

}

export default FaceRecognition;