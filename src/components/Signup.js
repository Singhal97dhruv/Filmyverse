import React, { useState } from 'react'
import { FadeLoader } from 'react-spinners'
import "./login.css"
import { Link } from 'react-router-dom'
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import swal from 'sweetalert'
import app from '../firebase/firebase'
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
const auth=getAuth(app);
const Signup = () => {
  const [form,setForm]=useState({
    name:"",
    mobile: "",
    password: ""
  })
  const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [otpSent,setOtpSent]=useState(false);
    const [OTP,setOTP]=useState("");

    const generateRecaptha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }, auth);
    }

    const requestOtp = () => {
      setLoading(true);
      generateRecaptha();
      let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "OTP Sent",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
        })
  }

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setLoading(false); 
        navigate('/login');
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {

    try {
    const salt=bcrypt.genSaltSync(10);
    var hash=bcrypt.hashSync(form.password,salt);

      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch(err) {
      console.log(err);
    }
  }



    return (
        <>
            <div className='flex w-full text-2xl justify-center'>
                <div className='flex flex-col p-24 my-8 w-3/5 justify-center text-[#f5f6fa] bg-[#353b48] border-2 rounded border-header'>
                    <p className='mx-auto text-6xl -translate-y-3/4 text-[#c0392b]'>SIGNUP</p>
            {
              otpSent?
              <>
              <h1 className=''>Confirm OTP</h1>
                    <input
                    
                        value={OTP}
                        placeholder='Enter your 6 digit OTP '
                        onChange={(e)=>setOTP(e.target.value)}
                    />
                    <button onClick={verifyOTP} class="flex mx-auto text-5xl bg-[#2ecc71] translate-y-8 w-1/4 justify-center items-center h-16 px-3  text-[#fff] bg-black border-0  focus:outline-none hover:bg-[#0b2964] transition-all duration-300 rounded text-lg">
                        {loading ? <FadeLoader color="#e74c3c"  speedMultiplier={2} /> : 'Confirm OTP'}

                    </button>
              </>
              :
              <>


                    <h1 className=''>Name:</h1>
                    <input
                        value={form.name}
                        type="text"
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                    />
                    <h1 className='' 
                    >Contact:</h1>
                    <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e)=>setForm({...form,mobile:e.target.value})}

                    />
                    <h1 className=''>Password:</h1>
                    <input
                        type={'password'}
                        value={form.password}
                        onChange={(e)=>setForm({...form,password:e.target.value})}
                    />

                    <button onClick={requestOtp} class="flex mx-auto text-5xl bg-[#2ecc71] translate-y-8 w-1/4 justify-center items-center h-16 px-3  text-[#fff] bg-black border-0  focus:outline-none hover:bg-[#0b2964] transition-all duration-300 rounded text-lg">
                        {loading ? <FadeLoader color="#e74c3c"  speedMultiplier={2} /> : 'Request OTP'}

                    </button>
                    <h2 className='flex justify-center text-header translate-y-12'>Already Have an account?<Link to="/login">

                        <span className='text-[#c0392b] ml-2'>Login</span>
                    </Link>
                    </h2>

              </>
            }
                </div>
                <div id="recaptcha-container"></div>
            </div>
        </>
    )
}

export default Signup
