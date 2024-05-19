import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { food_slider_1, food_slider_2, food_slider_3, food_slider_4 } from "@/app/utils/Images";
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
        <Slider arrows={false} {...settings} className="w-full h-screen object-cover">
            <div>
                <Image src={food_slider_1}/> 
            </div>
            <div>
                <Image src={food_slider_2}/>
            </div>
            <div>
                <Image src={food_slider_3}/>
            </div>
            <div>
                <Image src={food_slider_4}/>
            </div>
        </Slider>
    )
}

export default ImageSlider