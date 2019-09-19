import React, {Component} from 'react';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

import IconCalendar from '../img/icons/calendar.svg';


import './App.css';


 const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'home', //signin
    logged: 'false',
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
 }

class App extends Component {

  /*
   *
   * @route - keeps track of our current position in page transition 
   */
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})

  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:4000/imageurl', { 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input,
      })
    })
    .then(response => response.json())
    .then( response => {

      if(response) {
        fetch('http://localhost:4000/image', { 
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id,
          })
        })
        .then( resp => resp.json())
        .then( count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        }) 
        .catch(console.log);
        
      }

      this.displayBoundingBox(this.calcFace(response))
    })
    .catch(err => console.log(err))
  }

  calcFace = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImg');
    const width = Number(img.width);
    const height = Number(img.height);
    console.log(width + ',' + height)
    console.log(width + ',' + height)
    console.log(face.left_col * width)
    console.log(face.top_row * height)
    console.log(width * 2 - (face.right_col * width))
    console.log(height - (face.bottom_row * height))
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: (width - (face.right_col * width)),
      bottomRow: (height - (face.bottom_row * height)), 
    }
  }

  displayBoundingBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if(route === 'logout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({logged: true});
    }
    
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        {
          this.state.route === 'home' ? 
          
          <div>
          <Navigation onRouteChange={this.onRouteChange} />
          <div className="ml">
            <div className="wrapper">

              <div className="sub__title">
                Active Search
              </div>
            <div className="box" >
              <div className="box__left blue">
                <div className="box__content">
                <div className="box__details">
                  <div className="box__details__icon-wrapper">
                    <svg className="f-icon f-icon-calendar" shapeRendering="geometricPrecision" style={{backgroundImage: `url(${IconCalendar})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                        </svg>
                  </div>
                  <div className="box__details__content">26.4.2014 &mdash; 02:30 PM</div>
                </div>
                </div>
                
                
              </div>
              <div className="box__right blue-light">
              <div className="box__content">
              <div className="face__wrapper--small">
                
                <div className="face--small">

                </div> 
                <span className="image__name">
                  Image Name
                </span>
            </div>
              </div>
              
                
              </div>
            </div>

            <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition imageUrl={this.state.imageUrl} boundingBox={this.state.box} />
            </div>
          
            </div>
            
          </div>
          </div>

          : (
            this.state.route === 'signin' ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )          
        }
        
        
        {/* {<Logo />
        <ImageLinkForm />
        <FaceRecognition />} */}
      </div>
    )
  };
}

export default App;
