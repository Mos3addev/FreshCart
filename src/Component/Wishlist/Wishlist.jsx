import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../Context/Context';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Wishlist() {
    let {userData} = useContext(AuthContext)
    let {Cart,addToCart,deleteFromCart,deleteFromWishlist,Wishlist} = useContext(context)
    
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(false);
        const timeoutId = setTimeout(() => {
          setIsVisible(true);
        },500);
        return () => clearTimeout(timeoutId);
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>
        <div className='p-5'>
            <h1 className='text-center'>Hello in Your Wish List</h1>
            {Wishlist.length>0?
                <div className="row gy-5">
                {Wishlist?Wishlist.map(item=>(
                    <div key={item._id} className={`fade-container ${isVisible ? 'visible' : ''} col-xl-2 col-lg-3 col-md-4 col-sm-6`}>
                        <div className='product bg-main-light rounded-2'>
                            <div className='product-details '>
                                <Link to={`/product-details/${item._id}`}>
                                    <div className='overflow-hidden'>
                                        <img src={item.imageCover}  className='w-100' alt="" />
                                    </div>
                                </Link>
                                <div className='p-1'>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className='text-main'>{item.category.name}</h6>
                                            <div onClick={()=>{deleteFromWishlist(item._id)}} className='border-none'>
                                                <i className="fa-solid fa-heart text-main cursor-pointer"></i>
                                            </div>
                                    </div>
                                    <p className='fw-bolder'>{item.title.split(" ").slice(0,2).join(" ")}</p>
                                    <div className='d-flex justify-content-between align-items-center pt-2'>
                                        {item.priceAfterDiscount?
                                        <div>
                                            <span className="mb-0 fw-bold">{item.priceAfterDiscount} EGY </span>
                                            <span className='text-decoration-line-through text-muted fw-lighter'>{item.price}</span>
                                        </div>
                                        :
                                        <p className="mb-0 fw-bold">{item.price} EGP</p>
                                        }
                                        <div className='d-flex align-items-center'>
                                            <i className='rating-color fas fa-star'></i>
                                            {item.ratingsAverage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {userData?
                            <>
                            {Cart.products && Cart.products.find((cart) => cart.product && ((cart.product._id === item._id) || (cart.product === item._id))) ? (
                                <button onClick={() => { deleteFromCart(item._id) }} className='btn bg-main text-white w-100'>Delete From cart</button>
                                ) : (
                                <button onClick={() => { addToCart(item._id) }} className='btn bg-main text-white w-100'>Add to cart</button>
                                )}
                            
                            </>:''}
                        </div>
                    </div>
                )):''}
                </div>
            :<Loading/>}
        </div>
    </>
  )
}
