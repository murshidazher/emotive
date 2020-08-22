import React, { Component } from "react";
import ImageAnnotateRequest from "../../components/ImageAnnotateRequest/ImageAnnotateRequest";
import RequestList from "../../components/RequestList/RequestList";

class RequestPage extends Component {
  state = {
    requests: {}
  };

  addRequest = (imageUrl, tags) => {
    //create a unike key for each new fruit item
    var timestamp = new Date().getTime();
    // update the state object
    this.state.requests["request-" + timestamp] = {
      url: imageUrl,
      tags: tags
    };

    // set the state
    this.setState({ requests: this.state.requests });
  };

  onSubmit = () => {
    console.log(this.state.requests);
  };

  render() {
    return (
      <>
        <div className="sub__title">Request</div>
        <div className="component-wrapper mt8">
          <ImageAnnotateRequest addRequest={this.addRequest} />
          <RequestList request={this.state.requests} />
        </div>
        <div className="mt9">
          <button
            type="button"
            onClick={this.onSubmit}
            className="btn btn-primary btn-top "
          >
            Submit Request
          </button>
        </div>
      </>
    );
  }
}

export default RequestPage;
