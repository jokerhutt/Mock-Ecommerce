import './NavBar.css'
import './App.css'
import './Cart.css'
import React, {useState} from 'react';
import { useRef } from 'react';
import Drawers from './Drawers';
import {useDisclosure, Button} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import { motion, useIsPresent } from "framer-motion";


function NavBar ({ handleMenuChange, handleCartClear, summary, filterFunction, cartStuff, cartItems, productsList, handleCartAdd, handleCartRemove}) {

    const [open, setOpen] = useState(true);
    const isPresent = useIsPresent();
    const { isOpen: isFirstDrawerOpen, onOpen: onFirstDrawerOpen, onClose: onFirstDrawerClose } = useDisclosure();
    const { isOpen: isSecondDrawerOpen, onOpen: onSecondDrawerOpen, onClose: onSecondDrawerClose } = useDisclosure();
    const firstBtnRef = useRef();
    const secondBtnRef = useRef();

    function handleMenus (category) {
        handleMenuChange(category);
        onSecondDrawerClose();
    }

    return(
        <div className="navbar">
            <div className="navbar-logo">
               <Link to='/'>
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"/>
               </Link>
            </div>
            <div className="navbar-sort">
            <Link to="/products" onClick={() => handleMenus("men")}>
                <h3>Men</h3>
            </Link>
                <Link to="/products" onClick={() => handleMenus("women")}>
                <h3>Women</h3>
                </Link>
                <Link to="/products" onClick={() => handleMenus("kids")}>
                <h3>Kids</h3>
                </Link>
                <Link to="/products" onClick={() => handleMenus("discount")}>
                <h3>Sale</h3>
                </Link>
            </div>
            <div className="navbar-icons">
            <FiUser />
            <FiShoppingCart ref={firstBtnRef} onClick={onFirstDrawerOpen}/>
            <Drawer
                isOpen={isFirstDrawerOpen}
                placement='right'
                onClose={onFirstDrawerClose}
                finalFocusRef={firstBtnRef}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <h3>Your Cart</h3>
                </DrawerHeader>
                <DrawerBody>
                    <Drawers handleCartClear={handleCartClear} summary={summary} cartStuff={cartStuff} cartItems={cartItems} handleCartAdd={handleCartAdd} handleCartRemove={handleCartRemove}/>
                </DrawerBody>
                <DrawerFooter>
                    <div className='drawer-footer'>
                    <p>Total: €{Math.round (summary*100)/100}</p>
                    <button>Checkout</button>
                    </div>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <div className='menu-drawer'>
            <MdOutlineMenu ref={secondBtnRef} onClick={onSecondDrawerOpen}/>
            <Drawer
                isOpen={isSecondDrawerOpen}
                placement='right'
                onClose={onSecondDrawerClose}
                finalFocusRef={secondBtnRef}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <div className='hamburger-flex'>
                        <div className='hamburger-item'>
                        <Link to="/products" onClick={() => handleMenus("men")}>
                            <h3>Men</h3>
                        </Link>
                        </div>
                        <div className='hamburger-item'>
                        <Link to="/products" onClick={() => handleMenus("women")}>
                            <h3>Women</h3>
                        </Link>
                        </div>
                        <div className='hamburger-item'>
                        <Link to="/products" onClick={() => handleMenus("kids")}>
                            <h3>Kids</h3>
                        </Link>
                        </div>
                        <div className='hamburger-item'>
                        <Link to="/products" onClick={() => handleMenus("discount")}>
                            <h3>Sale</h3>
                        </Link>
                        </div>
                    </div>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
            
            </div>
            </div>
        </div>
    )
}


export default NavBar;