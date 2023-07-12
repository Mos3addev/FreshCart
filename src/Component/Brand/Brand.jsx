import React, { useContext, useEffect } from "react";
import { context } from "../../Context/Context";
import MainSlider from './../MainSlider/MainSlider';
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Brand() {
  let {brands} = useContext(context)
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    {brands.length>0?
    <>
      <MainSlider/>
      <div className="row">
        {brands.map(item=>(
          <Link to={`/BrandProduct/${item._id}`} key={item._id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 g-5 product">
            <img src={item.image} className="w-100" alt="" />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </> 
    :<Loading/>}
    </>
  );
}
