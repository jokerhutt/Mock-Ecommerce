import './productpage.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import transition from './transition';
import { Link } from 'react-router-dom'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
  import {useDisclosure,} from '@chakra-ui/react';


function ProductPage ({defaultValueSel, handleSorting, isCheckedMen, isCheckedKids, isCheckedWomen, isCheckedDiscount, productsList, filteredProducts, filterFunction, handleCategoryChange, handleStuff}){

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()


    return (
    <div className='product-page'> 
    <div className='filter-button'>
    <Button onClick={onOpen} size='md' backgroundColor='black' color='white'>Filter</Button>
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
                <h2>Filter ({filteredProducts.length})</h2>
                </DrawerHeader>
                <DrawerBody>
        <div className='sort-by'>
            <h4>Sort By</h4>
            <br/>
            <select className='sort-by-options' defaultValue={defaultValueSel} onChange={(e) => handleSorting(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowHigh">Price: Low to High</option>
                <option value="highLow">Price: High to Low</option>
                <option value="atoz">Name: A-Z</option>
                <option value="ztoa">Name: Z-A</option>
            </select>

        </div>
        <div className='category'>
            <h4>Category</h4>
            <br/>
            <div className='category-checkboxes'>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedMen} onChange={() => handleStuff("men")}> Men</Checkbox>
                </div>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedWomen} onChange={() => handleStuff("women")}>Women</Checkbox>
                </div>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedKids} onChange={() => handleStuff("kids")}>Kids</Checkbox>
                </div>
                </div>
        </div>
        <div className='price'>
            <h4>Price</h4>
            <br></br>
            <div className='input-with-text'>
            <Checkbox isChecked={isCheckedDiscount} onChange={() => handleStuff("discount")}>Discount</Checkbox>
            </div>
        </div>
                </DrawerBody>
                <DrawerFooter>
    
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
    </div>





    <div className='filter-container'>

        <div className='filter-header'>
            <h2>Filter ({filteredProducts.length})</h2>
        </div>
        <div className='sort-by'>
            <h4>Sort By</h4>
            <br/>
            <select className='sort-by-options' onChange={(e) => handleSorting(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowHigh">Price: Low to High</option>
                <option value="highLow">Price: High to Low</option>
                <option value="atoz">Name: A-Z</option>
                <option value="ztoa">Name: Z-A</option>
            </select>

        </div>
        <div className='category'>
            <h4>Category</h4>
            <br/>
            <div className='category-checkboxes'>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedMen} onChange={() => handleStuff("men")}> Men</Checkbox>
                </div>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedWomen} onChange={() => handleStuff("women")}>Women</Checkbox>
                </div>
                <div className='input-with-text'>
                    <Checkbox isChecked={isCheckedKids} onChange={() => handleStuff("kids")}>Kids</Checkbox>
                </div>
                </div>
        </div>
        <div className='price'>
            <h4>Price</h4>
            <br></br>
            <div className='input-with-text'>
            <Checkbox isChecked={isCheckedDiscount} onChange={() => handleStuff("discount")}>Discount</Checkbox>
            </div>
        </div>


    </div>
        <div className="product-grid">
            {filteredProducts.map((product) => (
                <div className='product-item'>
                    <Link to={`/products/${product.name}`}>
                    <img src={product.imageSRC}/>
                    </Link>
                    <h3> {product.name} </h3>
                    <p> €{product.price} </p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default transition(ProductPage);