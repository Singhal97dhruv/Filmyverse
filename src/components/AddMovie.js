import React, { Fragment, useContext, useState } from 'react'
import {RotateLoader} from 'react-spinners'
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';
const AddMovie = () => {
    const useAppstate=useContext(Appstate)
    const navigate=useNavigate();
    const [form,setForm]=useState({
        name:"",
        year:"",
        img:"",
        description:"",
        rating:0,
        rated:0,
    })
    const [loading,setLoading]=useState(false);

    const addMovie=async()=>{
        setLoading(true);
        try{
            if(useAppstate.login){
              await addDoc(moviesRef,form);
              swal({
                  title: "Successfully ADDED",
                  icon: "success",
                  buttons: false,
                  timer: 3000
              })
              setForm(
                {
                  name:"",
                  year:"",
                  img:"",
                  description:""
                }
              )
              navigate('/');
            }else{
              navigate('/login');
            }
        }catch(err){
            swal({
                title: err,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

  return (
  <Fragment>
 <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-[#e74c3c]">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-2xl text-[#1abc9c]">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    class="w-full bg-[#7f8c8d] rounded border border-gray-300 focus:bg-[#c7ecee] border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-[#000] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-2xl text-[#1abc9c]">
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({...form, year: e.target.value})}
                    class="w-full bg-[#7f8c8d] rounded border border-gray-300 focus:border-indigo-500 focus:bg-[#c7ecee] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-[#000] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-2xl text-[#1abc9c]">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.img}
                    onChange={(e) => setForm({...form, img: e.target.value})}
                    class="w-full bg-[#7f8c8d] rounded border border-gray-300 focus:border-indigo-500 focus:bg-[#c7ecee] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-[#000] py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-2xl text-[#1abc9c]">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    class="w-full bg-[#7f8c8d] rounded border border-gray-300 focus:border-indigo-500 focus:bg-[#c7ecee] focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors text-[#000] duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-3xl mt-3 h-16  text-[#27d2cc] bg-black border-0 py-2 px-8 focus:outline-none hover:bg-[#0b2964] transition-all duration-300 rounded text-lg">
                  {loading ? <RotateLoader color="#e74c3c" height={25}/> : 'Submit'}
                </button>
                {/* <Button className='flex mx-auto text-black-200 bg-[#ff7979] border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg'>
                    Submit
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
  </Fragment>
  )
}

export default AddMovie
