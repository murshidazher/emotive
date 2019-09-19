import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div>{`${name} current entry count is ${entries}`}</div>
    </div>
  );
};

export default Rank;
