import React, { useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRef } from 'react'
import { HiSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router'

const NavBar = ({ setProgress }) => {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    // const [setVisible] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();



    const location = useLocation()
    const matchRoutes = (routes) => {
        return matchPath({ path: routes }, location.pathname)
    }
    const show = useRef();
    const overlay = useRef();

    const shownav = () => {
        show.current.classList.toggle('navshow');
        overlay.current.classList.toggle('hidden');
    }



    //handeling navbar scroll
    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if (currentScrollPos > prevScrollPos) {
            // setVisible(false)
        } else {
            // setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handelSearch = (e) => {
        e.preventDefault();
        if (searchValue?.length > 0) {
            navigate(`/search/${searchValue}`);
            setSearchValue("");
        }
    }


    return (
        <div className={` flex sm:relative bg-richblack-900 w-screen relative z-50 h-14.5 items-center justify-center border-b-[1px] border-b-richblack-700 translate-y-  transition-all duration-500`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between m-2'>
                <Link to='/' onClick={() => { dispatch(setProgress(100)) }}>
                    <img src={logo} width={90} height={12} alt="Ticket Care" ></img>
                </Link>
                {/* mobile Navbar */}
                {
                    user && user?.accountType !== "Admin" && (
                        <div className=' md:hidden'>
                            {/* <Link to='/dashboard/cart' className=' relative left-10' onClick={() => { dispatch(setProgress(100)) }} > */}
                               
                                

                            {/* </Link> */}
                        </div>
                    )
                }

                <div className={`flex md:hidden  relative gap- flex-row ${token !== null && user?.accountType !== "Admin" ? " -left-12" : ""}`}>
                    <GiHamburgerMenu className={`w-16 h-8 fill-richblack-25 absolute left-10 -bottom-4 `} onClick={shownav} />
                    <div ref={overlay} className=' fixed top-0 bottom-0 left-0 right-0 z-30 bg w-[100vw] hidden h-[100vh] overflow-y-hidden bg-[rgba(0,0,0,0.5)] ' onClick={shownav}></div>
                    <div ref={show} className='mobNav z-50'>
                        <nav className=' items-center flex flex-col absolute w-[200px] -left-[80px] -top-7  glass2' ref={show}>
                            { 
                                token == null && (
                                    <Link to='/login' className='' onClick={() => { dispatch(setProgress(100)) }} >
                                        <button onClick={shownav} className=' mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                                            Login
                                        </button>
                                    </Link>
                                )
                            }
                            {
                                token == null && (
                                    <Link to='/signup' className='text-yellow-50' onClick={() => { dispatch(setProgress(100)) }} >
                                        <button onClick={shownav} className='mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200' >
                                            Signup
                                        </button>
                                    </Link>

                                )
                            }

                            {
                                token != null && (
                                    <div className=' mt-2' >
                                        <p className=' text-richblack-50 text-center mb-2'>Home</p>
                                       
                                        <ProfileDropDown />
                                       
                                    </div>
                                )
                            }
                             <Link to='/Home' onClick={() => { dispatch(setProgress(100)); shownav() }} className="p-2">
                                
                            </Link>

                            <div className=' mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]'></div>
                            <p className=' text-xl text-yellow-50 font-semibold'>Home</p>
                         
                            <div className=' mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]'></div>
                            <Link to='/about' onClick={() => { dispatch(setProgress(100)); shownav() }} className="p-2">
                                <p className=' text-richblack-5 '>
                                    About
                                </p>
                            </Link>
                            <Link to='/contact' onClick={() => { dispatch(setProgress(100)); shownav() }} className="p-2">
                                <p className=' text-richblack-5 '>
                                    Contact
                                </p>
                            </Link>
                        </nav>
                    </div>
                </div>



                {/* ----------------------- Desktop Navbar --------------------------*/}
                <nav>
                    <ul className=' flex-row gap-x-6 text-richblack-25 gap-5 hidden md:flex'>
                        {
                            NavbarLinks?.map((element, index) => (
                                <li key={index} >
                                    {
                                         (
                                            element.title==="Catalog"?(<div></div>):
                                            (<Link to={element?.path} onClick={() => { dispatch(setProgress(100)) }} >
                                                <p className={`${matchRoutes(element?.path) ? " text-yellow-25" : " text-richblack-25 hidden md:block"}`} >
                                                    {element?.title}
                                                </p>
                                            </Link>)
                                        )
                                    }
                                </li>
                            ))
                        }
                        <form onSubmit={handelSearch} className='flex items-center relative'>
                            <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} id='searchinput' type="text" placeholder="Search" className=' absolute top-0 left-0 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700' />
                            <HiSearch type='submit' id='searchicon' size={20} className=" text-richblack-100 top-1 absolute cursor-pointer left-20" />
                        </form>
                    </ul>
                </nav>

                <div className='flex-row gap-5 hidden md:flex items-center'>
                    {
                        user && user?.accountType !== "Admin" && (
                            // <Link to='/dashboard/cart' className=' relative px-4 ' onClick={() => { dispatch(setProgress(100)) }} >
                                <div className=' z-50'>
                                    {/* <TiShoppingCart className=' fill-richblack-25 w-7 h-7' /> */}
                                </div>
                               

                            // </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to='/login' className='text-richblack-25' onClick={() => { dispatch(setProgress(100)) }} >
                                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to='/signup' className='text-richblack-25' onClick={() => { dispatch(setProgress(100)) }} >
                                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100' >
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <div className=' pt-2' >
                                <ProfileDropDown />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar