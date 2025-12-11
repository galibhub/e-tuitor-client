import React from 'react';
import { Outlet } from 'react-router';
// import authImg from '../assets/authImage.png'
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import registerImg from '../assets/rIMG.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='flex items-center' >
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 hidden lg:block'> 
                    <img  src={registerImg} alt="" />
                </div>
            </div>
             <Footer />
        </div>
    );
};

export default AuthLayout;