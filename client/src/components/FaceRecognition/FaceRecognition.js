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
    const { imageUrl, boundingBox } = this.props;

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

          <div
            className="bounding-box"
            style={{
              top: boundingBox.topRow,
              right: boundingBox.rightCol,
              left: boundingBox.leftCol,
              bottom: boundingBox.bottomRow
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;
