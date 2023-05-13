import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Footer = () => {
  return (
    <div className='footer  fixed left-0 bottom-0 w-full flex justify-center text-xl z-10'>
       <h1 className='text-[#9b59b6]'>Made with <FavoriteIcon className='text-[#fd79a8]'/> by<Link to={'/about'}> <span className='font-bold text-[#0984e3]'>Dhruv Singhal</span></Link></h1>

    </div>
  )
}

export default Footer
