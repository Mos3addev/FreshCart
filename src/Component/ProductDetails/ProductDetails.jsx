import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { context } from '../../Context/Context'
import Loading from './../Loading/Loading';
import Aos from "aos";

export default function ProductDetails() {
    
    let {userData} = useContext(AuthContext)
    let {Cart,addToCart,deleteFromCart,addToWishlist,deleteFromWishlist,Wishlist} = useContext(context)
    let params = useParams()
    const [productDetails, setProductDetails] = useState([])
    const [currentImage, setCurrentImage] = useState(null);
    const getProductDetails = async()=>{
        let {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${params.id}`);
        setProductDetails(data.data)
        setCurrentImage(data.data.images[0]);
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    function handleThumbnailHover(img) {
        setCurrentImage(img);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(function () {
        Aos.init({ duration: 1000 });
    }, []);
    return (
        <>
        {productDetails.length!==0?
            <div data-aos="zoom-in" className='row align-items-center'>
                <div className='col-md-4 pe-5'>
                    <div className='d-flex align-items-center'>
                        <div className='col-xl-2 col-md-4 col-1'>
                            <div className='p-1 product-slider'>
                                {productDetails.images && productDetails.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`product-thumbnail product py-1 ${currentImage === img ? 'active' : ''}`}
                                        onMouseEnter={() => handleThumbnailHover(img)}
                                    >
                                        <img src={img} className='w-100 rounded-3'  alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <img src={currentImage} className='w-100 col-xl-2 col-md-8 col-11' alt="" />
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='ps-5'>
                        <div className='d-flex justify-content-between'>
                        <h3 className='pb-2 fw-bold'>{productDetails.title}</h3>
                        {userData?
                            <>
                                {Wishlist && Wishlist.find((wish) => wish._id === productDetails._id) ? (
                                <div onClick={()=>{deleteFromWishlist(productDetails._id)}} className='border-none'>
                                    <i className="fa-solid fa-heart text-main cursor-pointer"></i>
                                </div>
                                ) : (
                                <div onClick={()=>{addToWishlist(productDetails._id)}} className='border-none'>
                                    <i className="fa-regular fa-heart text-main cursor-pointer"></i>
                                </div>
                                )}
                            </>:''}
                        </div>
                        <h5 className='text-muted py-2'>{productDetails.description}</h5>
                        <div className='d-flex justify-content-between'>
                            <div className='d-md-flex justify-content-center'>
                                <h4 className=' text-main py-2'>{productDetails.category ? productDetails.category.name : ''} </h4>
                                
                                <h4 className=' text-main py-2'><span className='px-1 text-black'>|</span>{productDetails.subcategory ? productDetails.subcategory[0].name : ''}</h4>
                            </div>
                            <img className='img-footer' src={productDetails.brand ? productDetails.brand.image : ''} alt=''></img>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            {productDetails.priceAfterDiscount ?
                                <div>
                                    <span className="mb-0 fw-bold h4">{productDetails.priceAfterDiscount} EGY </span>
                                    <span className='text-decoration-line-through text-muted fw-lighter '>{productDetails.price}</span>
                                </div>
                                :
                                <p className="mb-0 fw-bold h4">{productDetails.price} EGP</p>
                            }
                            <h5>
                                <i className='fas fa-star rating-color'></i>{productDetails.ratingsAverage}
                                <span> | ({productDetails.ratingsQuantity}) Ratings</span>
                            </h5>
                        </div>
                        {userData?
                        <>
                        {Cart.products && Cart.products.find((cart) => cart.product && ((cart.product._id === productDetails._id) || (cart.product === productDetails._id))) ? (
                            <button onClick={() => { deleteFromCart(productDetails._id) }} className='btn bg-main text-white w-100'>Delete From cart</button>
                            ) : (
                            <button onClick={() => { addToCart(productDetails._id) }} className='btn bg-main text-white w-100'>Add to cart</button>
                            )}
                        
                        </>:''}
                    </div>
                </div>
            </div>
        :<Loading/>}
        </>
    )
}