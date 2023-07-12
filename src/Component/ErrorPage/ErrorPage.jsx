import { Link } from 'react-router-dom'
import error from '../../Images/error.svg'
import React from 'react'


export default function ErrorPage() {
  return (
    <div className='row py-5'>
        <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <div>
                <h1 className='fw-bolder'>Something’s wrong here...</h1>
                <h5 className='text-muted'>We can’t find the page you’re looking for. <br/>
                    Check out head back to home.</h5>
                <Link to='/' className='btn bg-main text-white fw-bold'>Back to home</Link>
            </div>
        </div>
        <div className='col-md-6'>
            <img src={error} className='w-100' alt="" />
        </div>
    </div>
  )
}
