import React, { Component } from "react";
import "./FaceRecognition.css";

class FaceRecognition extends Component {
  constructor() {
    super();
    this.state = {
      src:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    };

    this.myRef = React.createRef();
  }

  /* 
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'

  */

  render() {
    const { imageUrl, boundingBoxes } = this.props;

    return (
      <div>
        <div className="img__wrapper">
          <img
            id="inputImg"
            className="img"
            src={imageUrl}
            alt=""
            width="500px"
            heigh="auto"
          />

          {
            boundingBoxes.map(box => {
              return (<div key={box.rightCol} className="bounding-box"
                        style={{
                          top: box.topRow,
                          right: box.rightCol,
                          left: box.leftCol,
                          bottom: box.bottomRow
                }}></div>
              )
            })
            
          }
        </div>
      </div>
    );
  }
}

export default FaceRecognition;
