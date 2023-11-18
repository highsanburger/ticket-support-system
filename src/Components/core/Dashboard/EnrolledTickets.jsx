import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserTickets as getUserTickets}  from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const EnrolledTickets = () => {
    const dispatch=useDispatch();

    const {token}  = useSelector((state) => state.auth);

    const [enrolledTickets, setEnrolledTickets] = useState(undefined);
    const [progressData, setProgressData] = useState(undefined);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const getEnrolledTickets = async() => {
        setLoading(true);
            const response = await getUserEnrolledTickets(token,dispatch);
            console.log("getEnrolledTickets -> response", response?.ticketProgress);
            setLoading(false);
            setEnrolledTickets(response?.tickets);
            setProgressData(response?.ticketProgress);

    }

    const totalNoOfLectures = (ticket) => {
        let total = 0;
        ticket.ticketContent.forEach((section) => {
            total += section.subSection.length;
        });
        return total;
    }

    useEffect(()=> {
        getEnrolledTickets();
    },[]);

    if(Loading) {
        return (
            <div className='flex h-[calc(100vh)] w-full justify-center items-center'>
                <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500'></div>
            </div>
        )
    }


  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>

        <div className='text-3xl text-richblack-50'>Enrolled Tickets</div>
        {
            !enrolledTickets ? (<div>
                Loading...
            </div>)
            : !enrolledTickets.length ? (<p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any ticket yet</p>)
            : (
                <div className='my-8 text-richblack-5'>
                    <div className='flex rounded-t-lg bg-richblack-500 '>
                        <p className='w-[45%] px-5 py-3'>Ticket Name</p>
                        <p className='w-1/4 px-2 py-3'></p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>
                    {/* Cards shure hote h ab */}
                    {
                        enrolledTickets.map((ticket,index)=> (
                            <div key={index} onClick={()=>{
                                navigate(`view-ticket/${ticket._id}/section/${ticket.ticketContent[0]._id}/sub-section/${ticket.ticketContent[0].subSection[0]}`)}}
                                 className='flex items-center border border-richblack-700 rounded-none'>
                                <div className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'>
                                    <img className='h-14 w-14 rounded-lg object-cover'  src={ticket.thumbnail}/>
                                    <div className='flex max-w-xs flex-col gap-2'>
                                        <p className='font-semibold'>{ticket.ticketName}</p>
                                        <p className='text-xs text-richblack-300 hidden md:block'>{
                                            //description with max 50 characters
                                            ticket.ticketDescription.length > 50 ? ticket.ticketDescription.slice(0,50) + '....' : ticket.ticketDescription
                                        }</p>
                                    </div>
                                </div>

                                <div className='w-1/4 px-2 py-3'>
                                    {ticket?.totalDuration}
                                </div>

                                <div className='flex w-1/5 flex-col gap-2 px- py-3'>
                                    {
                                        progressData?.map((progress,index)=> {
                                            //show 0 progress if no progress data is available
                                            if(progress?.ticketID === ticket?._id) {
                                                return (
                                                    <div key={index}>
                                                        <p>Completed: {progress?.completedVideos?.length} / {totalNoOfLectures(ticket)}</p>
                                                        <ProgressBar
                                                            completed={progress?.completedVideos?.length/totalNoOfLectures(ticket)*100}
                                                            total={progress?.total}
                                                            height='8px'
                                                            isLabelVisible={false}
                                                            />
                                                    </div>
                                                )
                                            }
                                            return null;
                                        }
                                        )
                                    }
                                    </div> 
                            </div>
                        ))
                    }
                </div>
            )
        }
      
    </div>
  )
}

export default EnrolledTickets
