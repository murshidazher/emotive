import React, { Component } from "react";
import "./Slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  calcProgressBar = () => {
    return (this.props.width * this.state.value) / 100;
  };

  render() {
    return (
      <div className="slider" style={{ width: this.props.width + "px" }}>
        <div className="slider__comp">
          <div className="refresh__wrapper ">
            <svg className="refresh"></svg>
          </div>
          {/*<div className="slider__desc">
                    <div className='slider__title div-left'>{this.props.title}</div>
                    <div className="slider__val div-right">
                        <span>{this.state.value}</span>
                    </div> 
                    </div>*/}
        </div>
        <div className="a">{this.props.title}</div>

        <div className="b">
          <span className="b__text">{this.state.value}</span>
        </div>

        <div className="barCnt">
          <input
            className="colorized"
            type="range"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.state.value}
            id="range2"
            onChange={this.handleChange}
          />
          <p
            className="preBar"
            style={{ width: this.calcProgressBar() + "px" }}
          ></p>
        </div>
      </div>

      /* <div className="slider" style={{width: this.props.width+'px'}}>
                <div className="slider__comp">
                    <div className='refresh__wrapper '>
                        <svg className='refresh'></svg>
                        <div className='slider__title'>{this.props.title}</div>
                    <div className="slider__val">
                        <span>{this.state.value}</span>
                    </div>
                    </div>
                    
                    
                </div>
                
                <div className="barCnt">
                    <input className="colorized" type="range" min={this.props.min} max={this.props.max} step={this.props.step} value={this.state.value} id="range2" onChange={this.handleChange}/>
                    <p className="preBar" style={{width: this.calcProgressBar() +'px'}}></p>
                </div>
            </div> */
    );
  }
}

export default Slider;
