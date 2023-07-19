import React, { useContext } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../../App';
import "./header.css"
const Header = () => {

  const useAppstate = useContext(Appstate);

  return (
    <div className='header'>
      <h1 className='sticky z-10 text-4xl justify-between text-[#273c75] p-5 flex border-b-2 '><Link to={'/'}><span>SILLY<span
        className='text-[#192a56] pl-1'>WOOD</span></span></Link>
        {
          useAppstate.login ?
            <Link to={'/addmovie'}><Button color='success'><span className='cursor-pointer text-xl text-[#b71540]'><AddCircleOutlineIcon className='text-[#e67e22] text-2xl mr-3 pb-1' />ADD NEW</span></Button></Link>
            :
            <Link to={'/login'}><Button bg-header color='success'><span className='cursor-pointer text-xl text-[#b71540]'>LOGIN</span></Button></Link>
        }

      </h1>
    </div>
  )
}

export default Header
