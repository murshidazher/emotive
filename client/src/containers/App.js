import React, { Component } from "react";

import Navigation from "../components/Navigation/Navigation";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Logo from "../components/Logo/Logo";
import Modal from "../components/Modal/Modal";
import Profile from "../components/Profile/Profile";


import LogoImage from "../img/logo_main.svg";
import IconCalendar from "../img/icons/calendar.svg";
import IconAnalyze from "../img/icons/activity.svg";
import IconPointer from "../img/icons/mouse-pointer.svg";
import IconFacial from "../img/icons/aperture.svg";
import IconDemography from "../img/icons/target.svg";
import IconURL from "../img/icons/link.svg";

import "./App.css";


const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "home", // signin
  logged: true,
  profileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    city: "Arkansas",
    code: "+1",
    phone: "853 243 764 02",
    lastSearchUrl: "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png",
    lastSearchDate: "MM.DD.YYYY — HH:MM",
  },
  
};

/**
 * https://cdn.shopify.com/s/files/1/0123/7811/2057/files/shutterstock_753502027-3_1500x.jpg?v=1550093127
 * https://cdn.shopify.com/s/files/1/0123/7811/2057/files/shutterstock_627263492-7_4348aaa0-2880-438e-86c7-369f13e4880c_1500x.jpg?v=1550093965
 * https://cdn.shopify.com/s/files/1/0123/7811/2057/files/shutterstock_788577838-2_1500x.jpg?v=1550092632
 */

class App extends Component {
  /*
   *
   * @route - keeps track of our current position in page transition
   */
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = event => {
    this.setState({ input: (event.target.value).trim() });
  };

  loadUser = data => {
    this.setState(Object.assign(this.state.user,
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        lastSearchUrl: data.url,
        lastSearchDate: data.date
      }));
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:8080/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:8080/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              url: this.state.imageUrl
            })
          })
            .then(resp => resp.json())
            .then( data => {
              const { entries, url, now } = data;
              this.setState(Object.assign(this.state.user,
                {
                  entries: entries,
                  lastSearchUrl: url,
                  lastSearchDate: now
                }));
            })
            .catch(console.log);
        }

        this.displayBoundingBoxes(this.calcFaces(response));
      })
      .catch(err => console.log(err));
  };

  calcFaces = data => {
    return data.outputs[0].data.regions.map(clarifi => {
      const face = clarifi.region_info.bounding_box;
      const img = document.getElementById("inputImg");
      const width = Number(img.width);
      const height = Number(img.height);

      // rightCol: ((face.left_col * width) - (face.right_col * width)),
      // bottomRow: ((face.top_row * height) - (face.bottom_row * height)),

      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height
      };
    });
    
  };

  displayBoundingBoxes = boxes => {
    this.setState({ boxes: boxes });
  };

  onRouteChange = route => {
    if (route === "logout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ logged: true });
    }

    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      profileOpen: !prevState.profileOpen
    }))
  }

  render() {
    return (
      <div className="App">
        { this.state.profileOpen &&
          <Modal>
            <Profile isOpen={this.state.profileOpen} toggleModal={this.toggleModal} />
          </Modal>
        }
        {this.state.route === "home" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange}
              name={this.state.user.name}
              entries={this.state.user.entries}
              city={this.state.user.city}
              code={this.state.user.code}
              phone={this.state.user.phone}/>
            <div className="ml">
              <div className="wrapper">
                <div className="sub__title">Active Search</div>
                <div className="box">
                  <div className="box__left blue">
                    <div className="box__content">
                      <div className="box__details">
                        <div className="box__details__icon-wrapper">
                          <svg
                            className="f-icon f-icon-calendar"
                            shapeRendering="geometricPrecision"
                            style={{
                              backgroundImage: `url(${IconCalendar})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center"
                            }}
                          ></svg>
                        </div>
                        <div className="box__details__content">
                          {this.state.user.lastSearchDate}
                          {/* 26.4.2014 &mdash; 02:30 PM */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box__right blue-light">
                    <div className="box__content">
                    <div className="box__details">
                        <div className="box__details__icon-wrapper">
                          <svg
                            className="f-icon f-icon-calendar"
                            shapeRendering="geometricPrecision"
                            style={{
                              backgroundImage: `url(${IconURL})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center"
                            }}
                          ></svg>
                        </div>
                        <div className="box__details__content">
                          <a href={this.state.user.lastSearchUrl} target="_blank" rel="noopener noreferrer" className="box__details__content__link">{this.state.user.lastSearchUrl}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                  />
                  <FaceRecognition
                    imageUrl={this.state.imageUrl}
                    boundingBoxes={this.state.boxes}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="content">
              <div className="content__left">
              <video id="videobcg" preload="auto" autoPlay={true} loop="loop" muted="muted" volume="0">
                  <source src="https://ak6.picdn.net/shutterstock/videos/1023857446/preview/stock-footage-montreal-canada-february-using-a-vintage-computer-from-the-late-s-early-s-to-work.mp4" type="video/mp4" />
                  <source src="https://ak6.picdn.net/shutterstock/videos/1023857446/preview/stock-footage-montreal-canada-february-using-a-vintage-computer-from-the-late-s-early-s-to-work.webm" type="video/webm" />
                        Sorry, your browser does not support HTML5 video.
              </video>
                <div className="logo-top-wrapper">
                  <Logo backgroundImage={LogoImage} margin='0'/>
                  
                </div>
                
                <div className="heading mth">
                  Featured Experiences
                </div>
                <div className="features">
                  <div className="feature__block">
                    <div className="feature__icon">
                      <svg
                        className="f-icon-pointer"
                        shapeRendering="geometricPrecision"
                        style={{
                          backgroundImage: `url(${IconAnalyze})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></svg>
                    </div>
                    <div className="feature__heading">Live Analyzing</div>
                    <div className="para feature__content">Analyze images based on already hosted image URL.</div>
                  </div>
                  <div className="feature__block">
                  <div className="feature__icon">
                      <svg
                        className="f-icon-pointer"
                        shapeRendering="geometricPrecision"
                        style={{
                          backgroundImage: `url(${IconPointer})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></svg>
                    </div>
                    <div className="feature__heading">One-Click</div>
                    <div className="para feature__content">Analyze images by just one mouse click or finger press.</div>
                  </div>
                  <div className="feature__block">
                  <div className="feature__icon">
                      <svg
                        className="f-icon-pointer"
                        shapeRendering="geometricPrecision"
                        style={{
                          backgroundImage: `url(${IconFacial})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></svg>
                    </div>
                    <div className="feature__heading">Face Detection</div>
                    <div className="para feature__content">Detect images to get faces in the image with a bounding box for each face.</div>
                  </div>
                  <div className="feature__block">
                  <div className="feature__icon">
                      <svg
                        className="f-icon-pointer"
                        shapeRendering="geometricPrecision"
                        style={{
                          backgroundImage: `url(${IconDemography})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                      ></svg>
                    </div>
                    <div className="feature__heading">Demographics</div>
                    <div className="para feature__content">Analyze images to get prediction on age, gender, and appearance for each faces.</div>
                  </div>
                </div>
                
              </div>
              <div className="content__right">
                <div className="heading clr--white">
                  Share your Experiences to the world
                </div>
                <div className="heading-break ">
        
                </div>
                <div className="para clr--white mt-para">
                Create a safer and more personalized planet through facial recognition technology
                </div>
                {
                  this.state.route === "signin" ?
                    <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                    <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
