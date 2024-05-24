import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { food1, food2, food3, food4 } from "../../../utils/Image";
const ImageSlider = () => {
  var settings = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 500,
    speed: 2000,
  };
  return (
    <Slider arrows={false} {...settings} className="w-full h-screen ">
      <div className="h-screen w-full">
        <img src={food1} className="object-cover w-full" />
      </div>
      <div className="h-screen w-full">
        <img src={food2} className="object-cover w-full" />
      </div>
      <div className="h-screen w-full">
        <img src={food3} className="object-cover w-full" />
      </div>
      <div className="h-screen w-full">
        <img src={food4} className="object-cover w-full" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
