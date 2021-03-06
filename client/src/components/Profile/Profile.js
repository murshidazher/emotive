import React from "react";

import IconClose from "../../img/icons/x.svg";

import "./Profile.css";
import { AuthConsumer } from "../../context/AuthContext";


class Profile extends React.Component {

    constructor(props) {
      super(props);
        this.state = {}
    }

    onFormChange = (event) => {
        const value = ((event.target.value).trim());
        const isNull = !(value !== undefined && value !== null && value !== '');


        switch (event.target.name) {
            case 'user-name':
                if (isNull)
                    delete this.state.name;
                else
                    this.setState({name: value})
                break;
            case 'user-city':
                if (isNull)
                    delete this.state.city;
                else
                    this.setState({city: value})
                break;
            case 'user-phone':
                if (isNull)
                    delete this.state.phone;
                else
                    this.setState({phone: value})
                break;
            default:
                break;
        }
    }

    onProfileUpdate = (cb, data) => {
        fetch(`http://localhost:8080/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({ formInput: data })
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
              this.props.toggleModal();
              cb({ ...this.props.user, ...data });
            }
        }).catch(console.log());
    }

  render() {

        const { isOpen, toggleModal } = this.props;

        return (
          isOpen &&
          <AuthConsumer>
          {({ user, loadUser }) => (<div className="profile-modal">
                <main className="modal-form">
                    <div className="profile-setting__close" alt="close">
                        <svg
                            className="f-icon f-icon-close"
                            shapeRendering="geometricPrecision"
                            onClick={toggleModal}
                            style={{
                                backgroundImage: `url(${IconClose})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}
                        ></svg>
                    </div>
                    <div className="em-20">
                        <fieldset id="sign_up" className="ba b--white ph0 mh0">
                            <div>
                                <div className="face__wrapper face__wrapper__modal">
                                    <div className="face"></div>


                                </div>
                                <div className="user__location center">Member Since: {(user.joined).substring(0,10)}</div>
                            </div>
                            <div className="">
                                <label className="db fw6 lh-copy f6" htmlFor="user-name">
                                    Name
                </label>
                                <input
                                    className="pa2 ba bg-transparent b--black hover-black     w-100"
                                    type="text"
                                    name="user-name"
                                    onChange={this.onFormChange}
                                    placeholder={user.name}
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="user-city">
                                    City
                </label>
                                <input
                                    className="pa2 ba bg-transparent b--black hover-black w-100"
                                    type="text"
                                    onChange={this.onFormChange}
                                    placeholder={user.city}
                                    name="user-city"
                                    id="city"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="user-phone">
                                    Phone
                </label>

                                <input
                                    className="pa2 ba bg-transparent b--black hover-black w-100"
                                    type="text"
                                    placeholder={user.phone}
                                    onChange={this.onFormChange}
                                    name="user-phone"
                                    maxLength="14"
                                    id="phone"
                                />
                            </div>
                        </fieldset>
                        <div className="bg-blue pa2 center lh-copy mt3" onClick={() => this.onProfileUpdate(loadUser, this.state)}>
                            <span
                                className="f5 white link  db"
                            >
                                Save
              </span>
                        </div>
                    </div>
                </main>
            </div>)}
            </AuthConsumer>
        );
    };
}

  export default Profile;


