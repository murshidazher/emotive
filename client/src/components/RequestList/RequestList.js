import React, { Component } from 'react';

class RequestList extends Component {
  render() {
    return (
      <div className="container">
        <ul className="list-group text-center mt6">
          {(this.props.request !== undefined && this.props.request !== null ) &&
            Object.keys(this.props.request).map(function(key) {
              return (<div key={key} className="list-group-item list-group-item-info">
                <span>{this.props.request[key]['url']} - </span>
                <div>
                  {
                    Object.keys(this.props.request[key]['tags']).map(function(item, index) {
                      return (<span key={key + index}>{this.props.request[key]['tags'][index]}, </span>)
                    }.bind(this))
                }
                </div>
              </div>
              )
            }.bind(this))
          }
        </ul>
       </div>
     );
  }
}

export default RequestList;
