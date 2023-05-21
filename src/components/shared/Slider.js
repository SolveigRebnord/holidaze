import React, { Component } from "react";
import { Slide } from "react-slideshow-image";

class Slider extends Component {
  constructor() {
    super();
    this.slideRef = React.createRef();
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      current: 0,
    };
  }

  back() {
    this.slideRef.current.goBack();
  }

  next() {
    this.slideRef.current.goNext();
  }

  render() {
    const slideImages = this.props.media;

    const properties = {
      duration: 5000,
      autoplay: false,
      transitionDuration: 500,
      arrows: slideImages.length > 1 ? true : false,
      infinite: true,
      easing: "ease",
      indicators: true,
      nextArrow: (
        <span className="w-fit bg-purpleBlack p-2 h-fit mr-4">
          <img src="/arrow_white.svg" />
        </span>
      ),
      prevArrow: (
        <span className="w-fit bg-purpleBlack p-2 h-fit ml-4 rotate-180">
          <img src="/arrow_white.svg" />
        </span>
      ),
      canSwipe: true,
    };

    return (
      <div>
        <div className="slide-container">
          <Slide ref={this.slideRef} {...properties}>
            {slideImages.map((each, index) => (
              <div
                key={index}
                className="each-slide h-full w-full object-cover"
              >
                <img className="lazy h-full" src={each} alt="sample" />
              </div>
            ))}
          </Slide>
        </div>
      </div>
    );
  }
}

export default Slider;
