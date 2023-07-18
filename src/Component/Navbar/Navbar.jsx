/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import logo from "../../Images/freshcart-logo.svg"
import { NavLink, useLocation } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { context } from '../../Context/Context'

export default function Navbar() {
    let {userData,logOut}=useContext(AuthContext);
    let {Cart,Wishlist}=useContext(context);
    let {pathname} = useLocation();
    let homeColor , productColor  , categoryColor , brandColor,ProfileColor;
    let location =pathname.split('/').slice(1).join().split(',')[0]
    if(location===''){
        homeColor ='text-main'
    }else if(location==='product'){
        productColor ='text-main'
    }else if(location==='category'){
        categoryColor ='text-main'
    }else if(location==='brand'){
        brandColor ='text-main'
    }else if(location==='profile'){
        ProfileColor ='text-main'
    }

return <>
    <nav className="navbar mb-3 navbar-expand-lg bg-main-light shadow bg-body-tertiary">
        <div className="container">
            <NavLink to={'/'}><img src={logo} alt="" /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse py-2" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/"><span className={`nav-title ${homeColor}`}>Home</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/product"><span className={`nav-title ${productColor}`}>Products</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/category"><span className={`nav-title ${categoryColor}`}>Categories</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/brand"><span className={`nav-title ${brandColor}`}>Brands</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {userData?<>
                    
                    <li className="me-3 position-relative d-flex align-items-center">
                        <a href="https://www.facebook.com/profile.php?id=100009042109024" target='_blank' className='p-1' rel="noreferrer">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/ahmedmos3add/" target='_blank' className='p-1' rel="noreferrer">
                            <i className="fa-brands fa-instagram"></i>
                        </a>

                        <a href="https://www.linkedin.com/in/ahmedmosaadd/" target='_blank' className='p-1' rel="noreferrer">

                            <i className="fa-brands fa-linkedin"></i>
                        </a>

                        <a href="https://github.com/Mos3addev" target='_blank' className='p-1' rel="noreferrer">

                        <i className="fa-brands fa-github"></i>
                        </a>

                        
                    </li>
                    
                    <NavLink to={'/wishlist'}>
                        <li className="btn me-3 position-relative">

                            <i className="fa-regular fa-heart fs-4 text-main"></i>
                            <span className="position-absolute translate-middle badge rounded-pill bg-success">
                                {Wishlist.length}
                            </span>
                        </li>
                    </NavLink>
                    <NavLink to={'/cart'}>
                        <li className="btn me-3 position-relative">
                        <i className='fa-solid fa-cart-shopping fs-4 text-main'></i>
                            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success">
                                {Cart.products.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </li>
                    </NavLink>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile"><span className={`nav-title ${ProfileColor}`}>Hi {userData.name}</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink onClick={logOut} className="nav-link" to="#"><span className='text-danger fw-bold'>Logout</span></NavLink>
                    </li>
                    </>
                    :<>
                     <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    </>}    
                </ul>
            </div>
        </div>
    </nav>


</>
}
