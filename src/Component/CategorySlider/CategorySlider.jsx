/* eslint-disable no-dupe-keys */
import React, { useContext } from "react";
import Slider from "react-slick";
import { context } from "../../Context/Context";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  let {category} = useContext(context)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    dots:false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplaySpeed: 1500,

        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 1000,
        },
      },
    ],
  };
  
  return (
    <>
      <div className="py-3">
        <Slider {...settings} >
          {category.map((item)=>(
              <Link to={`/CategoryProduct/${item._id}`} key={item._id}>
                  <img src={item.image} className="w-100" height={200} alt="" />
                  <h5 className="p-2">{item.name}</h5>
              </Link>           
          ))}
        </Slider>
      </div>
    </>
  );
}
