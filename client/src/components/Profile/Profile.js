import React from "react";

import "./Profile.css";

const Profile = ({ isOpen, toggleModal }) => {
    
    return (
        <div className="profile-modal">
           <button onClick={toggleModal}>Click</button>
        </div>
    );
  };
  
  export default Profile;
  

