import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  ReactPictureAnnotation,
  defaultShapeStyle,
  DefaultInputSection
} from "react-picture-annotation";
import "./Annotate.css";

const Annotate = ({user}) => {
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const onResize = () => {
    setPageSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onSelect = selectedId => console.log(selectedId);
  const onChange = data => console.log(data);

  return (
    <div className="App">
      <ReactPictureAnnotation
        image="https://source.unsplash.com/random/800x600"
        onSelect={onSelect}
        onChange={onChange}
        width={pageSize.width / 1.75}
        height={pageSize.height / 1.25}
      />
    </div>
  );
};

export default Annotate;
