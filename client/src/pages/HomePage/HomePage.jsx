import React, { Component } from "react";

import Navigation from "../../components/Navigation/Navigation";

import Modal from "../../components/Modal/Modal";
import Profile from "../../components/Profile/Profile";

import { Switch, Route, withRouter } from "react-router-dom";
import FaceRecognitionPage from "../FaceRecognitionPage/FaceRecognitionPage";
import AnnotatePage from "../AnnotatePage/AnnotatePage";
import RequestPage from "../RequestPage/RequestPage";
import ResultPage from "../ResultPage/ResultPage";
import { AuthConsumer } from "../../context/AuthContext";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  logged: false,
  profileOpen: false
};

class HomePage extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      profileOpen: !prevState.profileOpen
    }));
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
            <Navigation
              onRouteChange={this.onRouteChange}
              modalToggle={this.toggleModal}
              name={user.name}
              entries={user.entries}
              city={user.city}
              code={user.code}
              phone={user.phone}
            />
            <div>
              {this.state.profileOpen && (
                <Modal>
                  <Profile
                    isOpen={this.state.profileOpen}
                    toggleModal={this.toggleModal}
                  />
                </Modal>
              )}
              {
                <div className="ml">
                  <div className="wrapper">
                    <Switch>
                      <Route path="/annotate" component={AnnotatePage} />
                      <Route path="/request" component={RequestPage} />
                      <Route path="/results" component={ResultPage} />
                      <Route path="/" component={FaceRecognitionPage} />
                    </Switch>
                  </div>
                </div>
              }
            </div>
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default withRouter(HomePage);
