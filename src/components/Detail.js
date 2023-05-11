import React, { useEffect } from 'react'
import './cards.css'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useState } from 'react'
import { doc,getDoc } from 'firebase/firestore'
import { RotateLoader } from 'react-spinners'
import Reviews from "./Reviews"
const Detail = () => {

    const [loading,setLoading]=useState(false);
    const {id}=useParams();
    const [data,setData]=useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated:0
    })
    useEffect(()=>{
        async function getData(){
            setLoading(true);
            const _doc=doc(db,"movies",id);
            const _data=await getDoc(_doc);
            setData(_data.data());
            setLoading(false);
        }
        getData();
    },[])

  return (

    <div className='p-3 mt-2 flex flex-col  md:flex-row md:items-start '>
     { loading?<div className='w-full flex justify-center items-center h-96'><RotateLoader color="#e74c3c" height={25}/></div>:<>

     <div className='card w-1/2 p-3 py-5 bg-[#2f3640] overflow-hidden '>
        <img className=' sticky top-10 w-full h-full hover:scale-125 transition duration-500' src={data.img} alt="" />
      </div>
      <div className=' p-6  md:w-1/2 md:ml-4 ml-0'>
            <h1 className='heading text-6xl text-[#e84118]'>{data.name}<span className='text-4xl p-2'>({data.year})</span></h1>
            <div className='pt-3'>

            <ReactStars size={25} half={true} value={data.rating/data.rated} edit={false} />
            </div>
            <p className='text-heading text-header '>{data.description}</p>
            
      <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>

      </div>
     </>
     }
    </div>
  )
}

export default Detail
