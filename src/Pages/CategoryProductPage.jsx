import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from '../Component/Product/Product';
import { context } from '../Context/Context';
import CategorySlider from '../Component/CategorySlider/CategorySlider';
export default function CategoryProductPage() {

    const { getCategoryProducts, categoryProducts } = useContext(context);
    const [sortBy, setSortBy] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [checkPrice, setCheckPrice] = useState("");
    const [pageNum, setPageNum] = useState("");
    let {CategoryId} = useParams()

  useEffect(() => {
    getCategoryProducts('title',"0","100000",'1',CategoryId)
  }, [CategoryId])
  
  async function handleSortChange(event) {
    const selectedOption = event.target.value;
    const sortingParam = getSortingParam(selectedOption);
    const newMinPrice = minPrice === "" ? "0" : minPrice;
    const newMaxPrice = maxPrice === "" ? "1000000" : maxPrice;
    
    if (parseInt(newMaxPrice) < parseInt(newMinPrice)) {
      setCheckPrice("Max price must be greater than or equal to min price");
      return;
    } else {
      setCheckPrice("");
    }
    
    await getCategoryProducts(sortingParam, newMinPrice, newMaxPrice,pageNum,CategoryId);
    setSortBy(selectedOption);
  }

  async function handlePageClick(pageNumber) {
    const sortingParam = getSortingParam(sortBy);
    const newMinPrice = minPrice === "" ? "0" : minPrice;
    const newMaxPrice = maxPrice === "" ? "1000000" : maxPrice;
    await getCategoryProducts(sortingParam, newMinPrice, newMaxPrice, pageNumber,CategoryId);
    setPageNum(pageNumber)
  }

  function getSortingParam(sortBy) {
    switch (sortBy) {
      case "price-high-to-low":
        return "-price";
      case "price-low-to-high":
        return "price";
      case "title-a-to-z":
        return "title";
      case "title-z-to-a":
        return "-title";
      default:
        return "title";
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
        <CategorySlider/>
      <div className="d-flex my-4 align-items-center justify-content-between">
        <div >
            <select
              className="p-2 rounded-2"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="" disabled>
                Sort by : Featured
              </option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="title-a-to-z">From A to Z</option>
              <option value="title-z-to-a">From Z to A</option>
            </select>
        </div>
        <div >
          <span className="h4">Price: </span>
          
          <label htmlFor="min-price" className='h5'>from: </label>
          <input
            className='w-25 p-2 rounded-2'
            type="text"
            id='min-price'
            placeholder="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            onKeyUp={handleSortChange}
          />
          <span className='h1
          '> | </span>
          <label htmlFor="max-price" className='h5'>to: </label>
          <input
            className='w-25 p-2 rounded-2'
            type="text"
            id='max-price'
            placeholder="1000000"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            onKeyUp={handleSortChange}
          />
        </div>
      </div>
      <h4 className="text-danger text-center">{checkPrice ? checkPrice : ""}</h4>

      <div className="row gy-5">
        <Product Products={categoryProducts} />
      </div>
      <div className="d-flex pt-5 justify-content-center align-items-center ">
        {categoryProducts.metadata ? (
          <>
            {categoryProducts.metadata.prevPage ? (
              <span
                className="btn me-2 bg-transparent text-muted border-black"
                onClick={() => handlePageClick(categoryProducts.metadata.prevPage)}
              >
                {categoryProducts.metadata.prevPage}
              </span>
            ) : (
              ""
            )}
            {categoryProducts.metadata.currentPage ? (
              <span
                className="btn me-2 bg-main text-white"
                onClick={() => handlePageClick(categoryProducts.metadata.currentPage)}
              >
                {categoryProducts.metadata.currentPage}
              </span>
            ) : (
              ""
            )}
            {categoryProducts.metadata.nextPage ? (
              <span
                className="btn me-2 bg-transparent text-muted border-black"
                onClick={() => handlePageClick(categoryProducts.metadata.nextPage)}
              >
                {categoryProducts.metadata.nextPage}
              </span>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}