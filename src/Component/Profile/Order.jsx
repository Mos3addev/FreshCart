import React, { useContext, useEffect } from "react";
import { context } from "../../Context/Context";
import Aos from "aos";

export default function Order() {
  let {Orders}=useContext(context);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="px-5">
      <div className="fw-bold h3">Your Orders</div>
        <div className="row">
          {Orders?Orders.map((item)=>(
          <div key={item.id} data-aos="zoom-in" className="border rounded-1 mb-2 border-success p-3 col-md-12">   
            <table  className="table mb-0 text-nowrap table-centered ">
  
              <tbody>
                <tr>
                  <th scope="row table-active">Total Order Price</th>
                  <td className="align-middle border-top-0 w-0">{item.totalOrderPrice} EGP</td>
                  
                </tr>
                <tr>
                  <th scope="row">Payment Method Type</th>
                  <td className="align-middle border-top-0 w-0">{item.paymentMethodType}</td>
                  
                </tr>

                <tr>
                  <th scope="row">Date</th>
                  <td className="align-middle border-top-0 w-0">{(item.createdAt.split("T")[0])}</td>
                  
                </tr>
                
              </tbody>
            </table>
            {item.cartItems.length>0?<table className="table mb-0 text-nowrap table-centered ">
                <thead className="bg-light">
                  <tr>
                    <th className="table-secondary">&nbsp;</th>
                    <th className="table-secondary">Product</th>
                    <th className="table-secondary">Order</th>
                    <th className="table-secondary">Paid</th>
                    <th className="table-secondary">Delivered</th>
                    <th className="table-secondary">Items</th>
                    <th className="table-secondary">Amount</th>
                  </tr>
                </thead>                  
                {item.cartItems.map((order)=>(
                  <tbody key={order._id}>
                    <tr>
                      <td className="align-middle border-top-0 w-0"><img src={order.product.imageCover} className="img-order" alt="" /></td>
                      <td className="align-middle border-top-0 ">{(order.product.title.split(" ").slice(0,5).join(" "))}</td>
                      <td className="align-middle border-top-0 w-0">{item.id}</td>
                      <td className="align-middle border-top-0 ">{item.isPaid?'Yes':'No'}</td>
                      <td className="align-middle border-top-0 w-0">{item.isDelivered?'Yes':'No'}</td>
                      <td className="align-middle border-top-0 w-0">{order.count}</td>
                      <td className="align-middle border-top-0 w-0">{(order.price)*(order.count)}</td>
                    </tr>
                  </tbody>
                ))}
              </table>:''}
          </div>
          )):''}
        </div>
      </div>
  );
}
