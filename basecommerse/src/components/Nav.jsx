import React, { useState } from 'react'
// import Button from './Button';
import { FaClipboardList, FaAlignJustify } from "react-icons/fa";

const Nav = () => {
    let Links =[
      {name:"HOME",link:"/"},
      {name:"SERVICE",link:"/"},
      {name:"ABOUT",link:"/"},
      {name:"BLOG'S",link:"/"},
      {name:"CONTACT",link:"/"},
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className=' bg-lime-300 md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-lime-900 mr-1 '>
            <FaClipboardList className='py-1 my-0' name="test"></FaClipboardList>
        </span>
        <span className=' text-lg font-mono uppercase'>
            Prueba Ecommerce
        </span>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden'>
        <span><FaAlignJustify className='py-1' name='menu'></FaAlignJustify></span>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-2 absolute md:static bg-lime-300 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${open ? ' top-16':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className=' hover:border hover:border-zinc-900 hover:bg-lime-700 md:ml-8 text-lg md:my-0 py-2 px-2'>
              <a href={link.link} className=' tracking-wider px-3 col-span-11 font-mono text-gray-800 hover:text-white duration-500'>{link.name}</a>
            </li>
          ))
        }
      </ul>
      </div>
    </div>
  )
}

export default Nav