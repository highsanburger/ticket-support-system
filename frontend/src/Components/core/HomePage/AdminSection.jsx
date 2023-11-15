import React from 'react'
import Admin from "../../../assets/Images/Admin.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa'

const AdminSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col md:flex-row gap-20 items-center'>

        <div className='w-[50%]'>
            <img
                src={Admin}
                alt=""
                className='shadow-white shadow-[-1.3rem_-1rem_0_0]'
            />
        </div>

        <div className='md:w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semobold md:w-[50%]'>
                Become an
                <HighlightText text={"Admin"} />
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Become an Admin And be a part of Ticket care platform , Solve the ticket of
            the Clients 
            </p>

            <div className='w-fit mx-auto'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Become Admin
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default AdminSection
