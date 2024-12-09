import React from 'react';
import { useParams } from 'react-router-dom';
import { GoPackage } from "react-icons/go";
import Drawers from './Drawers';
import transition from './transition';
import {useDisclosure, Button} from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import './Details.css'

function ProductDetails({ handleCartClear, summary, productsList, handleCartAdd, cartStuff, cartItems, handleCartRemove }) {
  const { productName } = useParams(); // Get the product name from the URL
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  // Find the product by name from the productsList
  const product = productsList.find(
    (product) => product.name === productName
  );

  function handleCartButton (product) {
    handleCartAdd(product)
    onOpen();
  }

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className='shoe-item'>
        <div className='main-shoe-image'>
            <img src={product.imageSRC}/>
        </div>
        <div className='main-shoe-info'>
            <h1>{product.name}</h1>
            <p>Unique ID: {product.id}</p>
            <p className='product-price'>€{product.price}</p>
            <p>{product.description}</p>
            <button ref={btnRef} onClick={() => handleCartButton(product.id)}>Add to Cart</button>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <h3>Cart ({cartStuff.length})</h3>
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


            <div className='detailsshipping'>
                <div className='shipping'>
                    <p>Shipping Information</p>
                    <GoPackage />
                </div>
                <div className='productdetailz'>
                    <p>Product Details</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default transition(ProductDetails);