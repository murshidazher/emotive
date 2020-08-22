import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../context/AuthContext";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <AuthConsumer>
        {({ signup }) => (
          <div className="w-100">
          <main className="black-80">
            <div className="measure clr--white">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <div className="">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent b--white hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent b--white hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>

                  <input
                    className="pa2 input-reset ba bg-transparent b--white hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <button
                  type="submit"
                  className="btn"
                  onClick={() => signup(this.state.name, this.state.email, this.state.password, this.props.handleAuth)}
                >
                  <span className="btn__content">Sign Up</span>
                </button>
              </div>
              <div className="ba dark-gray b--white  pa2 center lh-copy mt3">
                <Link
                  to="/signin"
                  className="f5 link white db"
                >
                  Sign In
                </Link>

              </div>
            </div>
          </main>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default Signup;
