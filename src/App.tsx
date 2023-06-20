import React, { useState } from 'react';
import { Navbar } from './components/navbar/Navbar';
import './app.scss'
import { ProductList } from './components/productsList/ProductList';
import { ProductDetails } from './components/productDetails/ProductDetails';
import { ShoppingCart } from './components/shoppingCart/ShoppingCart';
function App() {
  const [detailShow, setDetailShow] = useState(true)
  const [selectProduct, setSelectProduct] = useState(0)
  const [cartShow, setCartShow] = useState(false)


  const handleClickCart = () => {
    if(cartShow === true){
      setDetailShow(true)
      setCartShow(false)
      return
    }
    setDetailShow(false)
    setCartShow(true)
  }

  const handleClickProduct = (id) => {
    setDetailShow(true)
    setCartShow(false)
    setSelectProduct(id)
  }
  return (
    <>
      <Navbar handleClickCart={handleClickCart} cartShow={cartShow} />
      <div className="container">

        <div className="store">
          <h2>Store</h2>
          <ProductList  selectProduct={selectProduct} handleClickProduct={handleClickProduct} />
        </div>

        <div className="details">
          {
            detailShow && (
              <div className="products">
                
                <h2>Product</h2>
                {selectProduct < 1 ? <span className="text-alternative"> Please Choose a Product</span> : <ProductDetails id={selectProduct} />}
                

              </div>
            )
          }
          {
            cartShow && (
              <div className="cart-container">
                <h2>Shopping Cart</h2>
                <ShoppingCart />
              </div>
            )
          }

          
        </div>
      </div>

    </>
  );
}

export default App;
