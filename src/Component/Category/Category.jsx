import React, { useContext } from "react";
import { context } from "../../Context/Context";
import CategorySlider from "../CategorySlider/CategorySlider";
import Loading from "../Loading/Loading";

export default function Category() {
  let {category,subCategory} = useContext(context)
  return (
    <>
      {category.length>0?
      <>
      <CategorySlider/>
      <div className="d-flex">
        <div className="row">
          {category.map(category=>(
            <div key={category._id} className="col-md-2 d-flex flex-column py-2">
              <div className="pe-2 d-flex flex-column align-items-center">
                <img src={category.image} width={70} height={70} className="rounded-circle" alt="" />
                <h5 className="fw-bolder">{category.name}:</h5>
              </div>
              {subCategory.filter(subCategory=>subCategory.category===category._id).map(item=>(
                <div key={item._id} className="product">
                  <h3 className="h6 p-2 text-center">{item.name}</h3>
                </div>
              ))}
            </div>
          ))}
        
        </div>
      </div>
      </>
      :<Loading/>}
    </>
  );
}
