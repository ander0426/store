import React from 'react'
import './shoppingCart.scss'
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { Item } from '../../interfaces/products';
export const ShoppingCart = () => {
  const { cart }: any = useSelector((state: RootState) => state.cart)

  return (
    <div>
      <ul className="list-items">
      {cart && cart.map((product: Item, index: number) =>
                            <li className="items" key={`Product-${product.id}`}>
                            <div className="quantity"> <p>{product.quantity}</p> </div>
                            <div className="img-product">
                              <img src={product.img} className='responsive-img' />
                            </div>
                          </li>
                    )
                    }
      </ul>
      <div className="amount">Total: <span className="amount-cart">$25.50</span></div>
      <form action="https://checkout.wompi.co/p/" method="GET">
                                      <input type="hidden" name="public-key" value="pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV" />
                                      <input type="hidden" name="currency" value="COP" />
                                      <input type="hidden" name="amount-in-cents" value="100000" />
                                      <input type="hidden" name="reference" value={"sdasdasd"} />
                                      <button type="submit" className="waybox-button">Pagar con Wompi</button>
                                    </form>



    </div>
  )
}
