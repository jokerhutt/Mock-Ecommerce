import './productpage.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react';
import { motion } from 'framer-motion'
import transition from './transition';
import { Link } from 'react-router-dom'


function ProductPage ({productsList, filteredProducts, filterFunction}){

    const [toCheckMen, setToCheckMen] = useState(true)
    const [toCheckWomen, setToCheckWomen] = useState(true)
    const [toCheckDiscount, setToCheckDiscount] = useState(true)

    const handleMenCategory = () => {
        setToCheckMen(!toCheckMen);
        if (toCheckMen === true){
            filterFunction("men");
        }
        else {
            filterFunction("")
        }
    }
    const handleWomenCategory = () => {
        setToCheckWomen(!toCheckWomen);
        if (toCheckWomen === true){
            filterFunction("women");
        }
        else {
            filterFunction("")
        }
    }
    const handleDiscountCategory = () => {
        setToCheckDiscount(!toCheckDiscount);
        if (toCheckDiscount === true){
            filterFunction("discount");
        }
        else {
            filterFunction("")
        }
    }


    return (
    <div className='product-page'> 
    <div className='filter-button'>
    <Button size='md' backgroundColor='black' color='white'>Filter</Button>
    </div>
    <div className='filter-container'>

        <div className='filter-header'>
            <h2>Filter ({filteredProducts.length})</h2>
        </div>
        <div className='sort-by'>
            <h4>Sort By</h4>
            <br/>
            <select className='sort-by-options'>
                <option>Default</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
                <option>Name: Z-A</option>
            </select>

        </div>
        <div className='category'>
            <h4>Category</h4>
            <br/>
            <div className='category-checkboxes'>
                <div className='input-with-text'>
                    <input type="checkbox" value="men" onClick={handleMenCategory}/> <p>Men</p>
                </div>
                <div className='input-with-text'>
                    <input type="checkbox" value="women" onClick={handleWomenCategory}/> <p>Women</p>
                </div>
                <div className='input-with-text'>
                    <input type="checkbox"/> <p>Kids</p>
                </div>
                </div>
        </div>
        <div className='price'>
            <h4>Price</h4>
            <br></br>
            <div className='input-with-text'>
            <input type="checkbox" value="discount" onClick={handleDiscountCategory}/> <p>Discount</p>
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

export default transition(meow);