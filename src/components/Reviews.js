import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert'
import "./reviews.css"
import { ClockLoader } from 'react-spinners';
import { Appstate } from '../App';

const Reviews = ({ id, prevRating, userRated }) => {
    const useAppstate=useContext(Appstate);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [thought, setThought] = useState("");
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [newAdded,setNewAdded]=useState();
    const [data, setData] = useState([]);
    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieId: id,
                author: useAppstate.userName,
                rating: rating,
                thought: thought,
                timestamp: new Date().getTime()
            })
            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1,
            })
            setRating(0);
            setThought("");
            setNewAdded(newAdded+1);
            swal({
                title: "Successfully ADDED",
                icon: "success",
                buttons: false,
                timer: 3000
            })
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

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('movieId', '==', id))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })

            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])
    return (
        <div className='mt-6 border-t-2 border-header '>

            <ReactStars
                size={35}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <input value={thought} onChange={(e) => setThought(e.target.value)} className=' w-full bg-[#718093] h-10 mb-3 p-2 text-[#f5f6fa] rounded' placeholder='Share your thoughts!!' type="text" />
            <button type="submit" onClick={sendReview} className=' flex justify-center w-full bg-[#4cd137] rounded my-3 p-2 h-10 font-bold text-2xl'>
                {loading ? <TailSpin color='black' height={25} /> : 'Share'}
            </button>

            {reviewsLoading ?
                <div className='flex justify-center mt-10 '>

                    <ClockLoader
                        color='#e74c3c'
                        loading
                        size={35}
                    />
                </div>
                :
                <div className='mt-10'>

                    {data.map((e, i) => {
                        return (
                            <div className='card bg-[#353b48] p-2 m-2 rounded border-b-2 border-b-[#fff]' key={i}>
                                <div className='flex'>
                                    <p className='text-[#18dcff] font-bold'>{e.author}</p>
                                    <p className='ml-3 text-[#67e6dc]'>{new Date(e.timestamp).toLocaleString()}</p>
                                </div>
                                <ReactStars
                                    size={20}
                                    half={true}
                                    value={e.rating}
                                />
                                <p className='text-[#EAB543] text-lg'>{e.thought}</p>
                            </div>
                        )
                    })
                    }

                </div>}
        </div>
    )
}

export default Reviews
