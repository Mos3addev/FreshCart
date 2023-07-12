import React, { useEffect } from 'react'
import { Link, useLocation, Outlet} from 'react-router-dom';
import { ShoppingBag ,Settings,MapPin } from 'react-feather';
export default function Profile() {
    let {pathname} = useLocation();
    let YourOrder , Setting  , Address ;
    let location =pathname.split('/').slice(2).join()
    if(location===''){
        Setting ='bg-active'
    }else if(location==='order'){
        YourOrder ='bg-active'
    }else if(location==='address'){
        Address ='bg-active'
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className='row py-5'>
        <div className='col-md-3 d-flex flex-row justify-content-between'>
           <ul className='navbar-nav col-11'>
                <Link to='order' className={`profile-sitting ${YourOrder}`}><ShoppingBag className="feather-icon icon-shopping-bag me-2" /> Your Order</Link>
                <Link to='' className={`profile-sitting ${Setting}`}><Settings className="feather-icon icon-settings me-2" /> Settings</Link>
                <Link to='address' className={`profile-sitting ${Address}`}><MapPin className="feather-icon icon-map-pin me-2" />Address</Link>
            </ul>
            <div className='border-footer2 my-2'></div>
        </div>
        <div className='col-md-9'>
            <Outlet/>
        </div>
    </div>
  )
}
