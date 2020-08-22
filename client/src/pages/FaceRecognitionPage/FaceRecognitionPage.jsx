import React, { Component } from "react";

import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm";

import FaceRecognition from "../../components/FaceRecognition/FaceRecognition";

import IconCalendar from "../../img/icons/calendar.svg";
import IconURL from "../../img/icons/link.svg";
import { AuthConsumer } from "../../context/AuthContext";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  logged: false
};

class FaceRecognitionPage extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = event => {
    this.setState({ input: event.target.value.trim() });
  };

  onSubmit = id => {
    console.log(id);
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:8080/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:8080/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
              id: id,
              url: this.state.imageUrl
            })
          })
            .then(resp => resp.json())
            .then(data => {
              const { entries, url, now } = data;
              this.setState(
                Object.assign(this.state.user, {
                  entries: entries,
                  url: url,
                  date: now
                })
              );
            })
            .catch(console.log);
        }

        this.displayBoundingBoxes(this.calcFaces(response));
      })
      .catch(err => console.log(err));
  };

  calcFaces = data => {
    if (data && data.outputs) {
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
    }

    return;
  };

  displayBoundingBoxes = boxes => {
    if (boxes) this.setState({ boxes: boxes });
  };

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <>
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
                    <div className="box__details__content">{user.date}</div>
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
                      <a
                        href={user.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="box__details__content__link"
                      >
                        {user.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={user => this.onSubmit(user)}
              />
              <FaceRecognition
                imageUrl={this.state.imageUrl}
                boundingBoxes={this.state.boxes}
              />
            </div>
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default FaceRecognitionPage;
