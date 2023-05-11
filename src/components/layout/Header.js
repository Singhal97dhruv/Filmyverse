import React, { useContext } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../../App';
const Header = () => {

  const useAppstate=useContext(Appstate);

  return (
    <div className=''>
      <h1 className='sticky z-10 text-4xl justify-between text-[#e74c3c] p-5 flex border-b-2 '><Link to={'/'}><span>BOLLY<span 
      className='text-[#2ecc71] pl-1'>WOOD</span></span></Link>
      {
        useAppstate.login?
      <Link to={'/addmovie'}><Button color='success'><span className='cursor-pointer text-[#2ecc71]'><AddCircleOutlineIcon className='text-[#e67e22] text-2xl mr-3 pb-1'/>ADD NEW</span></Button></Link>
      :
      <Link to={'/login'}><Button bg-header color='success'><span className='cursor-pointer text-[#2ecc71]'>LOGIN</span></Button></Link>
      }
      
      </h1>
    </div>
  )
}

export default Header
