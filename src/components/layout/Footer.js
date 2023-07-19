import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Footer = () => {
  return (
    <div className='footer  h-48 w-full flex-col items-center flex justify-center text-xl z-10 border-t-2 border-t-black-100'>
       <h1 className='text-[#fff]'>Made with <FavoriteIcon className='text-[#e84393]'/> by</h1>
      <marquee behavior="" direction="left" scrollAmount="15" className="blink"> <Link to={'/about'}> <h1 className='font-bold text-4xl text-[#1B1464]'>Dhruv <span className='text-[#F79F1F]'>Singhal</span></h1></Link></marquee>
      <h5>Click on the name to redirect to the about section</h5>

    </div>
  )
}

export default Footer
