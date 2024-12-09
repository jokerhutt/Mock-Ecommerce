import './HomePage.css';
import React, {useState} from 'react';
import { motion } from 'framer-motion'
import transition from './transition';
import { Link } from 'react-router-dom'
import './app.css'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'


function HomePage({handleMenuChange, productsList, filterFunction}) {
    
    const [open, setOpen] = useState(true);
    //Iterate over

    return (
        <div className="homepage-main">
            <div className="homepage-header">
                <h1>Sport, <br/> the smart choice.</h1>
            </div>
            <div className="homepage-image">

                <img src="./MAINIMG.jpg"/>

            </div>
            <div className='categories-section'>
                <div className='mens'>
                        <img src="./MENS.jpg"/>
                    <div className='category-info'>
                        
                        <h3>Men</h3>
                        <p>See our men's collection for autumn</p>
                        <Link to="/products" onClick={() => handleMenuChange("men")}>
                        <button value="men">Explore</button>
                        </Link>
                    </div>
                </div>
                <div className='womens'>
                    <div className='category-info'>
                    <h3>Women</h3>
                        <p>Fresh summer collection avaible now</p>
                        <Link to="/products" onClick={() => handleMenuChange("women")}>
                        <button value="women">Explore</button>
                        </Link>
                    </div>
                        <img src="./WOMENS.jpg"/>
                </div>
                <div className='discount'>
                        <img src="./DISCOUNT.jpg"/>
                    <div className='category-info'>
                    <h3>On Sale</h3>
                        <p>Save this Autumn with our discounts</p>
                        <Link to="/products" onClick={() => handleMenuChange("discount")}>
                        <button value="discount">Explore</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default transition(HomePage);