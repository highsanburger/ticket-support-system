import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTicket, setEditTicket, setStep } from '../../../../slices/ticketSlice';
import { TICKET_STATUS } from '../../../../utils/constants';
import { addTicketToCategory, editTicketDetails } from '../../../../services/operations/ticketDetailsAPI';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublishTicket = () => {
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();
    const {token} = useSelector((state) => state.auth);
    const {ticket} = useSelector((state) => state.ticket);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(ticket?.status=== TICKET_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    },[]);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToMyTickets = () => {
        navigate("/dashboard/my-tickets");
    }

    const handelPublish = async () => {
        if((ticket?.status === TICKET_STATUS.PUBLISHED && getValues("public") === true) ||( ticket?.status === TICKET_STATUS.DRAFT && getValues("public") === false)) {
            goToMyTickets();
            setLoading(false);
            dispatch(setStep(1));
            dispatch(setEditTicket(null));
            return;
        }
        const formData = new FormData();
        formData.append("ticketId", ticket._id);
        formData.append("status", getValues("public") ? TICKET_STATUS.PUBLISHED : TICKET_STATUS.DRAFT);
        const result = await editTicketDetails(formData, token);
        const category_id= await ticket.category;
        console.log("category_id",category_id);
        const addTicketCategory = await addTicketToCategory({categoryId:category_id,ticketId:ticket._id},token);
        if(result && addTicketCategory) {
            goToMyTickets();
        } else {
            toast.error("Something went wrong");
        }
        if(addTicketCategory) {
        dispatch(setStep(1));
        dispatch(setEditTicket(null));
        setLoading(false);
        }
    }
        

    const onSubmit = (data) => {
        setLoading(true);
        handelPublish(data);
    }

  return (
    <div>
        <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5' >Publish Settings</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-6 mb-8'>
            <label htmlFor="public" className="inline-flex items-center text-lg">
                <input defaultChecked={false} type="checkbox" id="public" name="public" className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" {...register("public")} />
                <span className="ml-2 text-richblack-400">Make this ticket as public</span>
            </label>
            </div>
            <div className="ml-auto flex max-w-max items-center gap-x-4">
                <button disabled={loading} onClick={goBack} type="button" className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">Back</button>
                <button disabled={loading} type='submit' className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PublishTicket