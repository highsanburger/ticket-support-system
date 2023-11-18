import React from 'react'
import { useEffect } from 'react'
import { getAdminDashboard } from '../../../../services/operations/profileAPI'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'




const AdminDashboard = () => {
    const [ setDetails] = useState([])

    
    const {token} = useSelector(state => state.auth)
    
    const dispatch = useDispatch()
  

    useEffect(() => {
        (async () => {
            //get Admin details
            const adminDetails = await getAdminDashboard(token, dispatch);
            

            
            console.log("details",adminDetails);
        
            setDetails(adminDetails);
        })();
    }, [])

  


  return (
    <div>
        hi this is admin dashboard.
    </div>
  )
}

export default AdminDashboard