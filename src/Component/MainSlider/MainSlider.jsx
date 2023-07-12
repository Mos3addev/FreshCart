import React from 'react'
import Slider from "react-slick";
import slide1 from "../../Images/slide1.png"
import slide2 from "../../Images/slide2.png"
import slide3 from "../../Images/slide3.png"
import slide4 from "../../Images/slide4.png"
import slide5 from "../../Images/slide5.png"
import slide6 from "../../Images/slide6.png"
import slide7 from "../../Images/slide7.png"

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000
      };
  return <>
        <div className='py-4'>
        <Slider {...settings} >
            <img src={slide1} alt="" />
            <img src={slide2} alt="" />
            <img src={slide3} alt="" />
            <img src={slide4} alt="" />
            <img src={slide5} alt="" />
            <img src={slide6} alt="" />
            <img src={slide7} alt="" />
        </Slider>
        </div>
    </>
}
