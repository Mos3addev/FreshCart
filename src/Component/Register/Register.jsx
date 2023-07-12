import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function Register() {
  const notify=(msg,type)=>{
    toast[type](msg)
  }
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    name:Yup.string().min(3).max(15).required(),
    email:Yup.string().email().required(),
    password:Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,}$/,"The password must start with an uppercase letter and be followed by at least 5 characters that can be lowercase letters, digits, or any of the special characters @#$%.").required(),
    rePassword:Yup.string().oneOf([Yup.ref('password')],"Please enter the same password in both fields.").required(),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone number is not valid").required(), 
  })

  let registerFormik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit:(values,action)=>{
      setLoading(true)
      axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`,values).then((data)=>{
        if(data.status === 201){
        setLoading(false)
          notify('Success','success')
          navigate('/login')
        }
        action.resetForm();
      }).catch((error)=>{
        if(error.response.status === 409){
          setLoading(false)
          notify(error.response.data.message,'error')
        }
      })
    }
  })
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='w-50 m-auto my-5 '>
        <h2 className='bolder text-main'>Register Now</h2>
        <form onSubmit={registerFormik.handleSubmit}>
          <label className='text-main py-2' htmlFor="name">Name :</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.name} type="text" id='name' name='name' className='form-control' />
          {registerFormik.errors.name && registerFormik.touched.name?<div className='alert alert-danger my-2'>{registerFormik.errors.name}</div>:''}
          
          <label className='text-main py-2' htmlFor="email">Email :</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.email} type="email" id='email' name='email' className='form-control' />
          {registerFormik.errors.email && registerFormik.touched.email?<div className='alert alert-danger my-2'>{registerFormik.errors.email}</div>:''}
          
          <label className='text-main py-2' htmlFor="password">Password :</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.password} type="password" id='password' name='password' className='form-control' />
          {registerFormik.errors.password && registerFormik.touched.password?<div className='alert alert-danger my-2'>{registerFormik.errors.password}</div>:''}
          
          <label className='text-main py-2' htmlFor="rePassword">RePassword :</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.rePassword} type="password" id='rePassword' name='rePassword' className='form-control' />
          {registerFormik.errors.rePassword && registerFormik.touched.rePassword?<div className='alert alert-danger my-2'>{registerFormik.errors.rePassword}</div>:''}
          
          <label className='text-main py-2' htmlFor="phone">Phone :</label>
          <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.phone} type="text" id='phone' name='phone' className='form-control' />
          {registerFormik.errors.phone && registerFormik.touched.phone?<div className='alert alert-danger my-2'>{registerFormik.errors.phone}</div>:''}
          
          <button type='submit' disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} className='bg-main btn text-white py-2 mt-3'>{!loading?"Register":<i className='fas fa-spinner fa-spin'></i>}</button>
        </form>
      </div>
    </>
  )
}
