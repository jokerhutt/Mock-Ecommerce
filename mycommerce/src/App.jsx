import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { productList } from './productFile';
import { AnimatePresence } from 'framer-motion';
import ProductDetails from './ProductDetails';
import HomePage from './HomePage';
import ProductPage from './ProductPage';

function App() {

    //We need
    // Sort By
    // Filter By
    //Shoes Page
    //Register Page
    //20 shoes
    //Navbar with Logo, men, women, kids, user, and checkout
    //Cart is as a drawer
   
  const [productsList, setProductsList] = useState([]);

  const location = useLocation();

  const [filteredProducts, setFilteredProducts] = useState([])

  const [cartStuff, setCartStuff] = useState([]);

  const [isCheckedMen, setIsCheckedMen] = useState(true);
  const [isCheckedWomen, setIsCheckedWomen] = useState(true);
  const [isCheckedKids, setIsCheckedKids] = useState(true);
  const [isCheckedDiscount, setIsCheckedDiscount] = useState(true);
  const [defaultValueSel, setDefaultValueSel] = useState("default");


  useEffect(() => {
    setProductsList(productList);
    setFilteredProducts(productList)
    setCartItems(getDefaultCart(productList))
  }, []);

  const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
      cart[product.id] = 0;
    });
    return cart;
  };
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    setCartStuff(productsList.filter((item) => cartItems[item.id] > 0))
  }, [cartItems]);

  const handleCartAdd = (product) => {
    const newState = {...cartItems}
    newState[product] = (newState[product] || 0) + 1;
    setCartItems(newState);
    console.log(cartItems);
  }

  const handleCartRemove = (product) => {
    const newState = {...cartItems}
    newState[product] = (newState[product] || 0) - 1;
    setCartItems(newState);
    console.log(cartItems);
  }

  const handleCartClear = (product) => {
    const clearState = {...cartItems}
    clearState[product] = 0;
    setCartItems(clearState);
  }


  const handleMenuChange = (category) => {

    if (category === "men"){
      setIsCheckedDiscount(true)
      setIsCheckedKids(false)
      setIsCheckedWomen(false)
      setIsCheckedMen(true);
    }
    if (category === "women"){
      setIsCheckedDiscount(true)
      setIsCheckedKids(false)
      setIsCheckedWomen(true)
      setIsCheckedMen(false);
    }
    if (category === "kids"){
      setIsCheckedDiscount(true)
      setIsCheckedKids(true)
      setIsCheckedWomen(false)
      setIsCheckedMen(false);
    }
    if (category === "discount"){
      setIsCheckedDiscount(true)
      setIsCheckedKids(false)
      setIsCheckedWomen(false)
      setIsCheckedMen(false);
    }
  }


    useEffect(() => {
      const filtery = productsList.filter((cat) => {
        if (isCheckedMen === true && cat.category === "men"){
          return true;
        }
        if (isCheckedWomen === true && cat.category === "women"){
          return true;
        }
        if (isCheckedKids === true && cat.category === "kids"){
          return true;
        }
        if (isCheckedDiscount === true && cat.discount === "discount"){
          return true;
        }
        else {
          return false;
        }
      })
      setFilteredProducts(filtery);
    },[isCheckedMen, isCheckedWomen, isCheckedKids, isCheckedDiscount, productsList]);


    const handleStuff = (par) => {

      if (par === "men"){
          setIsCheckedMen(!isCheckedMen);
      }
      if (par === "women"){
          setIsCheckedWomen(!isCheckedWomen);
      }
      if (par === "kids"){
          setIsCheckedKids(!isCheckedKids);
      }
      if (par === "discount"){
          setIsCheckedDiscount(!isCheckedDiscount);
      }
    }

    const handleSorting = (e) => {

      setDefaultValueSel(e);

      const filterZa = () => {
        const zA = [...filteredProducts];
        const filteredAz = zA.sort((a, b) => b.name.localeCompare(a.name));
        setFilteredProducts(filteredAz);
      }
      const filterHighToLow = () => {
        const highToLow = [...filteredProducts];
        const filterHighLow = highToLow.sort((a, b) => b.price - a.price);
        setFilteredProducts(filterHighLow);
      }
      const filterLowToHigh = () => {
        const lowToHigh = [...filteredProducts];
        const filterLowHigh = lowToHigh.sort((a, b) => a.price - b.price);
        setFilteredProducts(filterLowHigh);
      }
      const filterAz = () => {
        const aZ = [...filteredProducts];
        const filteredAz = aZ.sort((a, b) => a.name.localeCompare(b.name));
        setFilteredProducts(filteredAz);
      }
      const filterDefault = () => {
        const defaults = [...filteredProducts];
        const filteredDefaults = defaults.sort((a, b) => a.id - b.id);
        setFilteredProducts(filteredDefaults);
      }

    if (e === "highLow"){
      filterHighToLow()
    }
    if (e === "lowHigh"){
      filterLowToHigh()
    }
    if (e === "atoz"){
      filterAz()
      }
    if (e === "ztoa"){
      filterZa();
      }
    if (e === "default"){
      filterDefault();
    }

    }





  const [summary, setSummary] = useState(0);

  useEffect(() => {
     
      const summation = cartStuff.reduce((total, product) => {
          const quantity = cartItems[product.id] || 0;
          return total + (product.price * quantity);
      }, 0);
      setSummary(summation);
  }, [cartStuff, cartItems]);


  return (
    <ChakraProvider>
        <NavBar handleMenuChange={handleMenuChange} handleCartClear={handleCartClear} summary={summary} cartStuff={cartStuff} cartItems={cartItems} productsList={productsList}/>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage handleMenuChange={handleMenuChange} productsList={productsList} />} />
            <Route path="/products" element={<ProductPage defaultValueSel={defaultValueSel} handleSorting={handleSorting} isCheckedMen={isCheckedMen} isCheckedWomen={isCheckedWomen} isCheckedKids={isCheckedKids} isCheckedDiscount={isCheckedDiscount}
            productsList={productsList} filteredProducts={filteredProducts} handleCartAdd={handleCartAdd} handleCartRemove={handleCartRemove} handleStuff={handleStuff}/>} />
            <Route path="/products/:productName" element={<ProductDetails handleCartClear={handleCartClear} summary={summary} productsList={productsList} handleCartAdd={handleCartAdd} handleCartRemove={handleCartRemove} cartStuff={cartStuff} cartItems={cartItems}/>}/>
          </Routes>
    </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;