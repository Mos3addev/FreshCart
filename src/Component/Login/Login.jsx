import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContext'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [sendEmail, setIsSendEmail] = useState(false);
  const [resetCode, setIsResetCode] = useState(false);
  const [resetPassword, setIsResetPassword] = useState(false);
  let {saveUserData} = useContext(AuthContext)
  const SendEmail = () => {
    setIsSendEmail(!sendEmail);
  };

  const ResetCode = () => {
    setIsResetCode(!resetCode);
  };

  const ResetPassword = () => {
    setIsResetPassword(!resetPassword);
  };  

  const notify=(msg,type)=>{
    toast[type](msg)
  }
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,}$/,"The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%.").required(),
  })

  let loginFormik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit:(values)=>{
      setLoading(true)
      axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signin`,values).then((data)=>{
        if(data.status === 200){
        localStorage.setItem("token",data.data.token)
        saveUserData();
        setLoading(false)
          notify('Success','success')
          navigate('/')
        }
      }).catch((error)=>{
        if( error.response.status === 401 || error.response.status === 400 ){
          setLoading(false)
          notify(error.response.data.message,'error')
        }
      })
    }
  })

  let SendEmailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/forgotPasswords`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);

            notify(data.data.message, "success");
            SendEmail();
            ResetCode();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  let ResetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .matches(/^[0-9]{0,6}$/)
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/verifyResetCode`, values)
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);

            notify(data.data.status, "success");
            ResetCode();
            ResetPassword();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  let ResetPasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9@#$%]{5,}$/,
          "The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%."
        )
        .required(),
    }),
    onSubmit: (values, action) => {
      setLoading(true);
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/auth/resetPassword`, values)
        .then((data) => {
          if (data.status === 200) {
              localStorage.setItem("token", data.data.token)
              setLoading(false);
              notify("Password Rested Succeeded", "success");
              ResetPassword();
          }
          action.resetForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='w-50 m-auto my-5 '>
        <h2 className='bolder text-main'>Login</h2>
        <form onSubmit={loginFormik.handleSubmit}>

          <label className='text-main py-2' htmlFor="email">Email :</label>
          <input onBlur={loginFormik.handleBlur} onChange={loginFormik.handleChange} value={loginFormik.values.email} type="email" id='email' name='email' className='form-control' />
          {loginFormik.errors.email && loginFormik.touched.email?<div className='alert alert-danger my-2'>{loginFormik.errors.email}</div>:''}
          
          <label className='text-main py-2' htmlFor="password">Password :</label>
          <input onBlur={loginFormik.handleBlur} onChange={loginFormik.handleChange} value={loginFormik.values.password} type="password" id='password' name='password' className='form-control' />
          {loginFormik.errors.password && loginFormik.touched.password?<div className='alert alert-danger my-2'>{loginFormik.errors.password}</div>:''}
          <div className='h6 fw-bold text-muted pt-3'>Can’t remember your password?<span onClick={SendEmail} className='text-main cursor-pointer'> Reset your password.</span></div>

          <button type='submit' disabled={!(loginFormik.isValid && loginFormik.dirty && !loading)} className='bg-main btn text-white py-2 mt-3'>{!loading?"Login":<i className='fas fa-spinner fa-spin'></i>}</button>
        </form>
      </div>

      {sendEmail && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={SendEmailFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">Send Email</h4>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={SendEmail}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="currentPassword">
                Send Email :
              </label>
              <input
                onBlur={SendEmailFormik.handleBlur}
                onChange={SendEmailFormik.handleChange}
                value={SendEmailFormik.values.email}
                type="email"
                id="email"
                name="email"
                className=" form-control text-muted"
              />
              {SendEmailFormik.errors.email && SendEmailFormik.touched.email ? (
                <div className="alert alert-danger my-2">
                  {SendEmailFormik.errors.email}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    SendEmailFormik.isValid &&
                    SendEmailFormik.dirty &&
                    !loading
                  )
                }
                className="btn my-3 bg-main text-white fw-bold"
              >
                {!loading ? (
                  "Send Email"
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {resetCode && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={ResetCodeFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">We sent a code to your email</h4>
              <h6>Enter the 6-digit verification code sent</h6>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={ResetCode}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="resetCode">
                Reset Code :
              </label>
              <input
                onBlur={ResetCodeFormik.handleBlur}
                onChange={ResetCodeFormik.handleChange}
                value={ResetCodeFormik.values.resetCode}
                type="text"
                id="resetCode"
                name="resetCode"
                placeholder="6 digit code"
                className=" form-control text-muted"
              />
              {ResetCodeFormik.errors.resetCode &&
              ResetCodeFormik.touched.resetCode ? (
                <div className="alert alert-danger my-2">
                  {ResetCodeFormik.errors.resetCode}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    ResetCodeFormik.isValid &&
                    ResetCodeFormik.dirty &&
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
      {resetPassword && (
        <div className="popup">
          <div className="popup-content position-relative">
            <form className="w-100" onSubmit={ResetPasswordFormik.handleSubmit}>
              <h4 className="fw-medium pt-2">
                Ender Your Email And New Password
              </h4>
              <button
                className="btn position-absolute top-0 end-0 p-2"
                onClick={ResetPassword}
              >
                X
              </button>
              <label className="text-main py-2" htmlFor="email">
                Email :
              </label>
              <input
                onBlur={ResetPasswordFormik.handleBlur}
                onChange={ResetPasswordFormik.handleChange}
                value={ResetPasswordFormik.values.email}
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className=" form-control text-muted"
              />
              {ResetPasswordFormik.errors.email &&
              ResetPasswordFormik.touched.email ? (
                <div className="alert alert-danger my-2">
                  {ResetPasswordFormik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label className="text-main py-2" htmlFor="newPassword">
                New Password :
              </label>
              <input
                onBlur={ResetPasswordFormik.handleBlur}
                onChange={ResetPasswordFormik.handleChange}
                value={ResetPasswordFormik.values.newPassword}
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter New Password"
                className=" form-control text-muted"
              />
              {ResetPasswordFormik.errors.newPassword &&
              ResetPasswordFormik.touched.newPassword ? (
                <div className="alert alert-danger my-2">
                  {ResetPasswordFormik.errors.newPassword}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={
                  !(
                    ResetPasswordFormik.isValid &&
                    ResetPasswordFormik.dirty &&
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
      
    </>
  )
}
