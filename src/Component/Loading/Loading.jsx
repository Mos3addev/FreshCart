import React from 'react'

export default function Loading() {
  return (
    <div className=" d-flex  justify-content-center  align-items-center ">
      <div className='py-5 my-5'>
        {/* <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div> */}
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    )
}
