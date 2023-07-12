import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../Context/Context';
import Loading from '../Loading/Loading';

export default function Cart() {
  const [checkoutPop, setIsCheckout] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  let { Cart, getCart, updateCountCart, deleteFromCart, address, Order } = useContext(context);
  
  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddressSelect = (address) => {

    setSelectedAddress(address);
  };

  const handleOrderSubmit = () => {
    Order({
        details: selectedAddress.details,
        phone : selectedAddress.phone,
        city : selectedAddress.city
      });
    setIsCheckout(false)
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {Cart.cartOwner ? (
        <div className='p-5'>
          <div className='bg-main-light rounded-3 px-5 py-3'>
            <h2 className='text-center'>Shop Cart</h2>
            <h4>Total Cart Price:{Cart?.totalCartPrice || '0'} EGP</h4>
            <h4>Number of Cart Items: {Cart?.products?.length || '0'} Products</h4>
          </div>
          <div className='d-flex flex-column py-3'>
            {Cart.products ? (
              Cart.products.map((item) => (
                <div key={item._id} className='d-flex px-5 py-3 mb-3 rounded-3 bg-main-light'>
                  <div className='col-2'>
                    <img src={item.product.imageCover} className='w-75 rounded-3' alt='' />
                  </div>
                  <div className='col-10'>
                    <h3>{item.product.title}</h3>
                    <h3>
                      Price : ({`${item.price} X ${item.count}`}) {(item.price) * item.count} EGP
                    </h3>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='py-2'>
                        <button onClick={() => updateCountCart(item.count - 1, item.product._id)} className='btn btn-outline-danger '>
                          -
                        </button>
                        <span className='fw-bolder mx-2'>{item.count}</span>
                        <button onClick={() => updateCountCart(item.count + 1, item.product._id)} className='btn btn-outline-success '>
                          +
                        </button>
                      </div>
                      <div>
                        <button onClick={() => deleteFromCart(item.product._id)} className='btn text-danger '>
                          Remove<i className='fa-regular text-danger fa-trash-can'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              ''
            )}
            {Cart.products.length > 0 ? (
              <div className='d-flex pt-3 rounded-3 justify-content-center'>
                <button onClick={() => setIsCheckout(true)} className='btn px-4 py-2 bg-main text-white fw-bold'>
                  Check Out
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {checkoutPop && (
            <div className=''>
              <div className=' position-relative'>
                <form className='w-100'>
                  <h4 className='fw-medium pt-2'>Cash on Delivery</h4>
                  <p className='text-muted'>Pay with cash when your order is delivered.</p>
                  <button className='btn position-absolute top-0 end-0 p-2' onClick={() => setIsCheckout(false)}>
                    X
                  </button>
                  <div className='row pt-3'>
                  {address.map((item) => (
                    <div key={item._id} className='col-md-4'>
                      <div className='address-card position-relative'>
                        <label>
                          <input
                            className="position-absolute top-0 end-0 m-2"
                            type='radio'
                            name='address'
                            checked={selectedAddress?._id === item._id}
                            onChange={() => handleAddressSelect(item)}
                          />
                          <h2>{item.name}</h2>
                          <h5>{item.details}</h5>
                          <h5>{item.city}</h5>
                          <h5>{item.phone}</h5>
                        </label>
                      </div>
                    </div>
                  ))}
                  </div>
                  {/* تم تعديل هذا الزر لإضافة خاصية disabled */}
                  <button type='button' onClick={handleOrderSubmit} className='btn my-3 bg-main text-white fw-bold' disabled={!selectedAddress}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}