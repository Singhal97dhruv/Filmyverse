import React, { useEffect, useState } from 'react'
import './cards.css'
import ReactStars from 'react-stars'
import { RotateLoader } from 'react-spinners'
import {getDocs} from 'firebase/firestore'
import {moviesRef} from '../firebase/firebase'
import { Link } from 'react-router-dom'
const Cards = () => {

    const [data,setData]=useState([
       
    ])
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        async function getData(){
            setLoading(true)
            const _data=await getDocs(moviesRef)
            _data.forEach((doc)=>{
                setData((prev)=>[...prev,{...(doc.data()),id: doc.id}])
            })
            setLoading(false)
        }
        getData();
    },[])

    return (

        <div className=' flex flex-wrap align-items-center m-3 p-3 mb-6'>
        {loading?<div className=' background w-full flex justify-center items-center h-96'><RotateLoader color="#e74c3c" height={25}/></div>:
        data.map((ele,i)=>{
        return(
          <Link to={`/detail/${ele.id}`}>  <div className='background card border-2 border-[#fff] p-3 m-2 hover:-translate-y-2 transition-all duration-300 rounded-lg md:mt-0 mt-3'>
                <div className='overflow-hidden p-2 bg-[#2f3640]'>

                    <img className='h-48 w-52 hover:scale-125 transition duration-500' src={ele.img} alt="" srcset="" />
                </div>
                <div className='text-[#45aaf2]'>
                    <h1> <span className='text-[#a55eea]'>Title: </span>{ele.name}</h1>
                    <h2> <span className='text-[#a55eea]'>Year:</span> {ele.year}</h2>
                    <h2 className='flex items-center'> <span className='text-[#a55eea] pr-1'>Ratings: </span> <ReactStars size={18} half={true} value={ele.rating/ele.rated} edit={false} /></h2>
                </div>

            </div></Link>
            
        )
        })
        }
        </div>

    )
}

export default Cards
