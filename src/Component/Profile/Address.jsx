import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { context } from "../../Context/Context";
export default function Address() {
  const [addressPop, setIsAddress] = useState(false);
  const [loading, setLoading] = useState(false)
  let {address,setAddress,deleteAddress} = useContext(context)

  const Address = () => {
    setIsAddress(!addressPop);
  };

  let AddressFormik = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: Yup.object({
      name:Yup.string().min(3).max(15).required(),
      details:Yup.string().min(5).max(50).required(),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone number is not valid").required(), 
      city:Yup.string().min(1).max(30).required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios.post(
          `${process.env.REACT_APP_BASE_URL}/addresses`,
          values,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            toast.success(data.data.message,{duration:1000,className:"text-success px-4 fw-bolder"});
            setAddress(data.data.data)
            Address();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error) {
            setLoading(false);
            toast.error(error.message,{duration:1000,className:"text-success px-4 fw-bolder"}); 
          }
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="px-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-bold h2">Address</div>
        <button className="btn bg-main text-white" onClick={Address}>Add a new address</button>
      </div>
      <div className="row pt-3">
        {address.map((item)=>(
          <div key={item._id} className="col-md-4">
            <div className="address-card position-relative">
              <h2>{item.name}</h2>
              <h5>{item.details}</h5>
              <h5>{item.city}</h5>
              <h5>{item.phone}</h5>
              <button onClick={() => { deleteAddress(item._id) }} className="btn text-danger position-absolute end-0 bottom-0">Remove<i className="fa-regular text-danger fa-trash-can"></i></button>
            </div>
          </div>
        ))}
      </div>
      {addressPop && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={AddressFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">
                New Shipping Address
              </h4>
              <p className="text-muted">
                Add new shipping address for your order delivery.
              </p>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={Address}
              >
                X
              </button>

              <label className="text-main py-2" htmlFor="name">
                Name :
              </label>
              <input
                onBlur={AddressFormik.handleBlur}
                onChange={AddressFormik.handleChange}
                value={AddressFormik.values.name}
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                className=" form-control text-muted"
              />
              {AddressFormik.errors.name &&
              AddressFormik.touched.name ? (
                <div className="alert alert-danger p-2 my-1">
                  {AddressFormik.errors.name}
                </div>
              ) : (
                ""
              )}

              <label className="text-main py-2" htmlFor="name">
                Details:
              </label>
              <input
                onBlur={AddressFormik.handleBlur}
                onChange={AddressFormik.handleChange}
                value={AddressFormik.values.details}
                type="text"
                id="details"
                name="details"
                placeholder="Enter Your Home details"
                className=" form-control text-muted"
              />
              {AddressFormik.errors.details &&
              AddressFormik.touched.details ? (
                <div className="alert alert-danger p-2 my-1">
                  {AddressFormik.errors.details}
                </div>
              ) : (
                ""
              )}

              <label className="text-main py-2" htmlFor="name">
                Phone :
              </label>
              <input
                onBlur={AddressFormik.handleBlur}
                onChange={AddressFormik.handleChange}
                value={AddressFormik.values.phone}
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone"
                className=" form-control text-muted"
              />
              {AddressFormik.errors.phone &&
              AddressFormik.touched.phone ? (
                <div className="alert alert-danger p-2 my-1">
                  {AddressFormik.errors.phone}
                </div>
              ) : (
                ""
              )}

              <label className="text-main py-2" htmlFor="name">
                City :
              </label>
              <input
                onBlur={AddressFormik.handleBlur}
                onChange={AddressFormik.handleChange}
                value={AddressFormik.values.city}
                type="text"
                id="city"
                name="city"
                placeholder="Enter Your Home Name"
                className=" form-control text-muted"
              />
              {AddressFormik.errors.city &&
              AddressFormik.touched.city ? (
                <div className="alert alert-danger p-2 my-1">
                  {AddressFormik.errors.city}
                </div>
              ) : (
                ""
              )}
 
              <button
                type="submit"
                disabled={
                  !(
                    AddressFormik.isValid &&
                    AddressFormik.dirty &&
                    !loading
                  )
                }
                className="btn my-3 bg-main text-white fw-bold"
              >
                {!loading ? (
                  "Submit"
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
