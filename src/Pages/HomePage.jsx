import React, { useContext, useEffect } from "react";
import MainSlider from "../Component/MainSlider/MainSlider";
import CategorySlider from "../Component/CategorySlider/CategorySlider";
import Products from "../Component/Products/Products";
import { context } from "../Context/Context";
import Loading from "../Component/Loading/Loading";
export default function HomePage() {
  const {category } = useContext(context);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <>
        {category.length>0?
        <>
          <MainSlider />
          <h3>Shop popular Categories</h3>
          <CategorySlider />
          <Products />
        </>
        :<Loading/>}
      </>
  );
}