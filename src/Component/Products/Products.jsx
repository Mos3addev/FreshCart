import React, { useContext, useState } from 'react'
import Product from '../Product/Product';
import { context } from '../../Context/Context';
import Loading from './../Loading/Loading';
export default function Products() {
  const { getProducts, ProductsData } = useContext(context);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checkPrice, setCheckPrice] = useState("");
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
    
    await getProducts(sortingParam, newMinPrice, newMaxPrice);
    setSortBy(selectedOption);
  }

  async function handlePageClick(pageNumber) {
    const sortingParam = getSortingParam(sortBy);
    const newMinPrice = minPrice === "" ? "0" : minPrice;
    const newMaxPrice = maxPrice === "" ? "1000000" : maxPrice;
    await getProducts(sortingParam, newMinPrice, newMaxPrice, pageNumber);
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
  
  return (
    <>
        <div className="d-md-flex my-4 align-items-center justify-content-between">
          <div className='pt-2'>
            <span className="h4">Sort: </span>
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
          <div className='d-flex pt-2 justify-content-center align-items-center'>
            <span className="h4 pt-md-2">Price: </span>
            <div>  
              <span>
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
              </span>
              <span className='h1
              '> | </span>
              <span>

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
              </span>
            </div>
          </div>
        </div>
        <h4 className="text-danger text-center">{checkPrice ? checkPrice : ""}</h4>
        {ProductsData.data && ProductsData.data.length>0?
        <>
          <div className="row gy-5">
            <Product Products={ProductsData} />
          </div>
          <div className="d-flex pt-5 justify-content-center align-items-center ">
            {ProductsData.metadata ? (
              <>
                {ProductsData.metadata.prevPage ? (
                  <span
                    className="btn me-2 bg-transparent text-muted border-black"
                    onClick={() => handlePageClick(ProductsData.metadata.prevPage)}
                  >
                    {ProductsData.metadata.prevPage}
                  </span>
                ) : (
                  ""
                )}
                {ProductsData.metadata.currentPage ? (
                  <span
                    className="btn me-2 bg-main text-white"
                    onClick={() => handlePageClick(ProductsData.metadata.currentPage)}
                  >
                    {ProductsData.metadata.currentPage}
                  </span>
                ) : (
                  ""
                )}
                {ProductsData.metadata.nextPage ? (
                  <span
                    className="btn me-2 bg-transparent text-muted border-black"
                    onClick={() => handlePageClick(ProductsData.metadata.nextPage)}
                  >
                    {ProductsData.metadata.nextPage}
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
        :<Loading/>}
    </>
  );
}