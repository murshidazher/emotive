import React from "react";
import "./Login.css";
import { Link, withRouter} from "react-router-dom";
import { AuthConsumer } from "../../context/AuthContext";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
    };
  }


  onEmailChange = event => {
    this.setState({ loginEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ loginPassword: event.target.value });
  };

  render() {
    return (

          <div className="w-100">
            <main className="black-80">
              <div className="measure clr--white">
                <fieldset id="login" className="ba b--transparent ph0 mh0">
                  <div className="">
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
              <AuthConsumer>
              {({ signin }) => (
                <>
                  <div className="">
                    <button
                      type="submit"
                      className="btn"
                      onClick={() => signin(this.state.loginEmail, this.state.loginPassword, this.props.handleAuth)}
                    >
                      <span className="btn__content">Sign in</span>
                    </button>
                  </div>
                  <div className="ba dark-gray b--white  pa2 center lh-copy mt3">
                    <Link
                      to="/signup"
                      className="f5 link white db"
                    >
                      Sign up
                </Link>
                  </div>
                </>
              )}
      </AuthConsumer>

              </div>
            </main>
          </div>

    );
  }
}


export default withRouter(Login);
