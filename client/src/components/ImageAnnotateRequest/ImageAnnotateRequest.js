import React, { Component } from 'react';
import "./ImageAnnotateRequest.css";

class ImageAnnotateRequest extends Component {

  createRequest = (e) => {
    e.preventDefault();



    var imgUrl = this.refs.imgUrl.value;
    var tags = this.refs.imageTag.value.split(",");

        if(typeof imgUrl === 'string' && imgUrl.length > 0) {
          this.props.addRequest(imgUrl, tags);
          //reset the form
          this.refs.requestForm.reset();
        }
  }

  render() {
    return(
      <form className="form-inline " ref="requestForm" onSubmit={this.createRequest}>
      <div className="form-group mtr-4">
        <label className="label" htmlFor="imgUrl">Image Url</label>
        <input type="text" id="imgUrl" placeholder="e.x.https://someurl.com/someimg.jpg" ref="imgUrl" className="form-control" />
        </div>
      <div className="form-group mtr-4">
        <label className="label" htmlFor="imageTag">What to Tag</label>
        <input type="text" id="imageTag" placeholder="i.e.   bus, car, hot dog, trains" ref="imageTag" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary btn-top ">Add Request</button>
     </form>
    )
  }
}

export default ImageAnnotateRequest;
