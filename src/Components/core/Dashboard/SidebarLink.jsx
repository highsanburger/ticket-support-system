import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location  = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }


  return (
    <NavLink
    to={link.path}
    className={ ` py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${matchRoute(link.path) ? "bg-yellow-800" :"bg-opacity-0"}`}
    >

        

       
    </NavLink>
  )
}

export default SidebarLink
