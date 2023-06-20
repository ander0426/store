import React, { useEffect, useState } from 'react'
import './productList.scss'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { ReqResListado } from '../../interfaces/products';

interface ProductListProps {
  handleClickProduct(id:number): void,
  selectProduct: number,
}


export const ProductList = ({selectProduct, handleClickProduct}: ProductListProps) => {
  const dispatch = useDispatch();
  const { cart }: any = useSelector((state: RootState) => state.cart)
  const [Products, setProducts] = useState<ReqResListado>();
  

  const getData = async (nombre: string) => {
    await fetch(nombre + ".json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        localStorage.setItem("Products", JSON.stringify(data))
        setProducts({ ...data })
      })
  }


  const getProductos = () => {
    return JSON.parse(localStorage.getItem('Products') || '{}')
  }

  useEffect(() => {
    if (localStorage.getItem('Products')) {
      setProducts(getProductos())

    } else {
      getData("products")
    }

  }, [])

  useEffect(() => {
   console.log(cart)
  }, [cart])
  return (
    <>
      <div className='prueba'>
        <div className="row">

          {
            Products && Products.products.map((product, index) =>
              product.amount > 0 &&
              <div className="column">
                <div className="product" key={"product-" + index} onClick={() => handleClickProduct(product.id)}>
                  <img src={product.img} className='w-100' alt={`Product-${product.id}`} />
                  {
                  cart.map((item, index) => {
                  return  item.id === product.id ? <div className="quantity-product"> <p>{item.quantity}</p></div> : "" 
                  }

                  )}
                </div>
              </div>
            )}
        </div>
      </div>

    </>
  )
}
