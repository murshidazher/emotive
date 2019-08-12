import React, {Component} from 'react';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Clarifai from 'clarifai';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'ff32d18b0f054ed5900557af30d1d5e0'
 });



class App extends Component {

  /*
   *
   * @route - keeps track of our current position in page transition 
   */
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      logged: 'false',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( response => this.displayBoundingBox(this.calcFace(response)))
      .catch(err => console.log(err))
  }

  calcFace = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImg');
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height), 
    }
  }

  displayBoundingBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if(route === 'logout') {
      this.setState({logged: false});
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
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boundingBox={this.state.box} />
          </div>
          </div>

          : (
            this.state.route === 'signin' ? <Login onRouteChange={this.onRouteChange}/> 
            : <Signup onRouteChange={this.onRouteChange}/>
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
