import React from "react";
import "./Rank.css";

class Rank extends React.Component {

  constructor() {
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries)
  }

  componentDidUpdate(prevProps, preState) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name)
      return null;
    this.generateEmoji(this.props.entries)
  }

  generateEmoji = (entries) => {
    fetch(`https://ob294ph1m5.execute-api.ap-south-1.amazonaws.com/prod/rank/?rank=${entries}`)
      .then(resp => resp.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log())
  }

  render() {
    return (
      <div className="rank__badge">
        <div>{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }

};

export default Rank;
