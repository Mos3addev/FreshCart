import React from 'react'
import amazonpay from '../../Images/amazonpay.svg'
import mastercard from '../../Images/mastercard.png'
import paypal from '../../Images/paypal.png'
import appstore from '../../Images/appstore.png'
import googleplay from '../../Images/googleplay.png'

export default function Footer() {
  return <>
  <footer className='bg-main-light mt-4 py-5'>
    <div className='container'>
        <h2 className='py-2'>Get the FreshCart app</h2>
        <h6 className='py-2'>We will send you a link, open it on your phone to download the app.</h6>
        <div className='py-2'>
            <form className='row ps-4'>
                <div className='col-md-9 '>
                    <input type="email"  className='form-control' placeholder='Email ..'  />
                </div>
                <button className='btn bg-main text-white col-md-3'>Share App Link</button>
            </form>
        </div>
        <div className='border-footer my-2'></div>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
                <span className='h6 '>Payment Partners</span>
                <img src={amazonpay} className='img-footer' alt="" />
                <img src={mastercard} className='img-footer' alt="" />
                <img src={paypal} className='img-footer' alt="" />
              
            </div>
            <div>
                <span>Get deliveries with FreshCart</span>
                <img src={appstore} className='img-footer' alt="" />
                <img src={googleplay} className='img-footer' alt="" />
            </div>
        </div>
        <div className='border-footer my-2'></div>
        <p className='text-center'><small> &copy; Copyrights Reserved by Mos3ad, All Rights reserved </small></p>
    </div>
  </footer>
  </>
}