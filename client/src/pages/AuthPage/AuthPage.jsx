import React, { Component } from "react";

import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import Logo from "../../components/Logo/Logo";

import LogoImage from "../../img/logo_main.svg";
import IconAnalyze from "../../img/icons/activity.svg";
import IconPointer from "../../img/icons/mouse-pointer.svg";
import IconFacial from "../../img/icons/aperture.svg";
import IconDemography from "../../img/icons/target.svg";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

class AuthPage extends Component {
  state = {
    redirectToReferrer: false
  };

  handleAuth = () => {
    this.setState(() => ({
      redirectToReferrer: true
    }));
  };

  render() {
    if (this.context.isAuthenticated) {
      this.handleAuth();
    }

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className="content">
        <div className="content__left">
          <video
            id="videobcg"
            preload="auto"
            autoPlay={true}
            loop="loop"
            muted="muted"
            volume="0"
          >
            <source
              src="https://ak6.picdn.net/shutterstock/videos/1023857446/preview/stock-footage-montreal-canada-february-using-a-vintage-computer-from-the-late-s-early-s-to-work.mp4"
              type="video/mp4"
            />
            <source
              src="https://ak6.picdn.net/shutterstock/videos/1023857446/preview/stock-footage-montreal-canada-february-using-a-vintage-computer-from-the-late-s-early-s-to-work.webm"
              type="video/webm"
            />
            Sorry, your browser does not support HTML5 video.
          </video>
          <div className="logo-top-wrapper">
            <Logo backgroundImage={LogoImage} margin="0" />
          </div>

          <div className="heading mth">Featured Experiences</div>
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
              <div className="para feature__content">
                Analyze images based on already hosted image URL.
              </div>
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
              <div className="para feature__content">
                Analyze images by just one mouse click or finger press.
              </div>
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
              <div className="para feature__content">
                Detect images to get faces in the image with a bounding box for
                each face.
              </div>
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
              <div className="para feature__content">
                Analyze images to get prediction on age, gender, and appearance
                for each faces.
              </div>
            </div>
          </div>
        </div>
        <div className="content__right">
          <div className="heading clr--white">
            Share your Experiences to the world
          </div>
          <div className="heading-break "></div>
          <div className="para clr--white mt-para">
            Create a safer and more personalized planet through facial
            recognition technology
          </div>

          <Switch>
            <Route path="/signup">
              <Signup handleAuth={this.handleAuth} />
            </Route>

            <Route path="/">
              <Login handleAuth={this.handleAuth} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AuthContext;

export default withRouter(AuthPage);
