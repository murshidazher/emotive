import React from "react";

import IconClose from "../../img/icons/x.svg";

import "./Profile.css";

const Profile = ({ isOpen, toggleModal }) => {
    
    return (
        <div className="profile-modal">
            {/* <button onClick={toggleModal}>Click</button> */}
           
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
                            <div className="user__location center">Member Since: {'December'}</div>
                        </div>
              <div className="">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                    className="pa2 ba bg-transparent b--black hover-black     w-100"
                    type="text"
                    name="name"
                    placeholder="John"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  City
                </label>
                <input
                  className="pa2 ba bg-transparent b--black hover-black w-100"
                  type="email"
                  placeholder="John"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="phone">
                  Phone
                </label>

                <input
                  className="pa2 ba bg-transparent b--black hover-black w-100"
                  type="text"
                  placeholder="John"
                  name="phone"
                  id="phone"
                />
              </div>
            </fieldset>
            <div className="bg-blue pa2 center lh-copy mt3">
              <span
                className="f5 white link  db"
              >
                Save
              </span>
            </div>
          </div>
        </main>
        </div>
    );
  };
  
  export default Profile;
  

