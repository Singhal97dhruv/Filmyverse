import React, { useContext, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {query,where, getDocs} from 'firebase/firestore'
import { usersRef } from '../firebase/firebase'
import { Appstate} from "../App"
import bcrypt from 'bcryptjs'
const Login = () => {
    const navigate=useNavigate();
    const useAppstate=useContext(Appstate)
    const [form,setForm]=useState({
        mobile: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const login=async()=>{
        setLoading(true);
        try{
            const quer=query(usersRef,where('mobile','==',form.mobile))
            const querySnapshot=await getDocs(quer);
            if(querySnapshot.size===0){
                swal({
                    title: "Invalid Credentials",
                    icon: "error",
                    buttons: false,
                    timer: 3000
                })
            }
            else{
            querySnapshot.forEach((doc)=>{
                const _data=doc.data();
                const isUser=bcrypt.compareSync(form.password,_data.password);
                if(isUser){
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged IN",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/');
                }else{

                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })

                }
            })
        }

        }
        catch (err) {
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
        <>
            <div className='flex w-full text-2xl justify-center'>
                <div className='flex flex-col p-24 my-8 w-3/5 justify-center text-[#f5f6fa] bg-[#353b48] border-2 rounded border-header'>
                    <p className='mx-auto text-6xl -translate-y-3/4 text-[#c0392b]'>LOGIN</p>
                    {/* <h1 className=''>Name:</h1>
                    <input
                        type="text"
                    /> */}
                    <h1 className='' 
                    >Contact:</h1>
                    <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e)=>setForm({...form,mobile:e.target.value})}

                    />
                    <h1 className=''>Password:</h1>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e)=>setForm({...form,password:e.target.value})}
                    />

                    <button onClick={login} class="flex mx-auto text-5xl bg-[#2ecc71] translate-y-8 w-1/4 justify-center items-center h-16 px-3  text-[#fff] bg-black border-0  focus:outline-none hover:bg-[#0b2964] transition-all duration-300 rounded text-lg">
                        {loading ? <FadeLoader color="#e74c3c"  speedMultiplier={2} /> : 'Login'}

                    </button>
                    <h2 className='flex justify-center text-header translate-y-12'>Don't Have an account?<Link to="/signup">

                        <span className='text-[#c0392b] ml-2'>Signup</span>
                    </Link>
                    </h2>
                </div>

            </div>
        </>
    )
}

export default Login
