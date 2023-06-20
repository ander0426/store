import React from 'react'
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import './navbar.scss';
interface navProps {
    handleClickCart(): void;
    cartShow: boolean;
}
export const Navbar = (
  {
    handleClickCart,
    cartShow,
  }: navProps
) => {
  return (
    <nav className="flex-container">
      <div className="flex-item-left">
        <span className="logo">
          <FaShoppingBag />
        </span>
      </div>
      <div className="flex-item-right" data-testid="cart-icon">
        <span className={cartShow ? "cart open" : "cart"} onClick={() => handleClickCart()}>
          <FaShoppingCart />
          <span className="cart-cost">$25.50</span>
          {cartShow && (
            <span data-testid={"close-cart-button"} className="close-cart" onClick={() => handleClickCart()}>X</span>
          )}
        </span>
      </div>


    </nav>
  )
}
