import React, { useState, useContext } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { Link } from 'react-router-dom';
import { FaAlignJustify, FaAngleDown } from "react-icons/fa";
import { Store } from '../Store';

const Nav = () => {
    // const { keycloak, initialized } = useKeycloak();
    let Links =[
        {name:"HOME",link:"/"},
        {name:"USERS",link:"/users"},
        {name:"BOOKS",link:"/books"},
    ];
    let [open,setOpen]=useState(false);

    const { state, dispatch:ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymenMethod')
    }
  return (
    <div className=' sticky shadow-md w-full top-0 left-0'>
      <div className={`bg-gradient-to-r from-stone-800 via-yellow-900 to-stone-700 md:flex items-center justify-between py-4 md:px-10 px-7`}>
      <div className='cursor-pointer flex items-center font-[Poppins] text-white'>
        <span className='text-3xl text-lime-900 mr-1 '>
          <img src="../a.png" className='py-1 my-0 mx- w-6' alt="book" />
            {/* <FaClipboardList className='py-1 my-0' name="test"></FaClipboardList> */}
        </span>
        <Link to={"/"}>
          <span className=' text-lg font-mono uppercase'>
              BOOKSTORE
          </span>
        </Link>
        <div className=' absolute mx-36 cursor-pointer flex items-center font-[Poppins] 
      text-gray-400'>
        <Link to={"/cart"} className="">
          <span className=' text-sm hover:text-white'>
              Cart
          </span>
          {
            cart.cartItems.length > 0 && (  
              <span className="px-1.5 py-0.5 text-xs mx-1 rounded-full bg-yellow-500">
                  <span className=' text-white'>{cart.cartItems.reduce((a,c) => a + c.quantity, 0)}</span>
              </span>  
              
            )
          }
        </Link>    
      </div>
      </div>
      
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden'>
        <span><FaAlignJustify className='py-1' name='menu'></FaAlignJustify></span>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${open ? 'bg-gradient-to-r from-stone-800 via-yellow-900 to-stone-700 top-16':'top-[-490px]'}`}>
        {
          Links.map((url)=>(
            <li key={url.name} className={`transition md:ml-8 text-lg md:my-0 py-2 px-2 ${open ? 'hover:scale-105 hover:mx-2 ':'hover:scale-110 '} `}>
              <Link to={url.link} onClick={()=>setOpen(!open)} className=' tracking-wider px-3 col-span-11 font-mono text-white hover:text-gray-200 duration-500'>{url.name}</Link>
            </li>
          ))
        }
        <li>
        {userInfo ? (
          <div className="mx-4">

          <div className="dropdown inline-block relative">
            <div className=''>
              <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                <span className="mr-1">{userInfo.name}</span>
                <FaAngleDown></FaAngleDown>
              </button>
            </div>
            <div className=''>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className=""><Link className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to={'/profile'}>Perfil</Link></li>
                <li className=""><Link className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to={'/orderhistory'}>Historial</Link></li>
                <li className=""><Link className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to={'#signout'} onClick={signoutHandler}>Logout</Link></li>
              </ul>
            </div>
            
          </div>
        
        </div>
        ) : (
          <div className=' mx-4 my-1 md:mx-4 md:my-0 hover:bg-slate-400 transition-colors'>
            <Link className=' bg-slate-100 px-2 py-1 rounded' to={'/signin'}>
              Sign In
            </Link>
          </div>
        )}
        </li>
      </ul>
      {/*<div className="hidden xl:flex items-center space-x-5">
         <div className="hover:text-gray-200">
            {!keycloak.authenticated && (
            <button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.login()}
            >
                Login
            </button>
            )}

            {!!keycloak.authenticated && (
            <button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.logout()}
            >
                Logout ({keycloak.tokenParsed.preferred_username})
            </button>
            )}
        </div> 
        </div>  */}       
      </div>
    </div>
  )
}

export default Nav