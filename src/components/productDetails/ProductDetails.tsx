import React, { useEffect, useState } from 'react'
import './productDetails.scss'
import { Product, ReqResListado } from '../../interfaces/products';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from "../../store/store";
import { useDispatch } from 'react-redux/es/exports';
import { addCart, removeCart } from '../../actions/cart';
interface product {
    id: number,
}
export const ProductDetails = ({
    id,
}: product) => {
    const { cart }: any = useSelector((state: RootState) => state.cart)
    const [productDetail, setProductDetail] = useState<Product>()
    const [amount, setAmount] = useState(0)
    const dispatch = useDispatch();
    const findProduct = async () => {
        const data = await JSON.parse(localStorage.getItem("Products") || "")
        return data
    }

    const addToCart = (id: number, quantity: number, name: string, price: number, img: string) => {
        setAmount(amount+1)
        console.log("add_" + id + "quantity: " + quantity);
        dispatch(addCart(
            {
                id: id,
                name: name,
                img: img,
                quantity: quantity,
                price: price,
            }
        ))
    }

    const removeToCart = (id: number) => {
       amount > 1 ? setAmount(amount-1) : setAmount(0)
        dispatch(removeCart(id))
    }

    const  consultAmount = (id: number) => {
        const productAmount = cart.find(item => item.id === id)
        if(productAmount){
            console.log(productAmount)
        setAmount(productAmount.quantity)
        }else{
            setAmount(0)
        }
        
    }


    useEffect(() => {
        const data = findProduct().then(data => {
            const result = Object.assign({}, data)
            const found = result.products.find(obj => {
                return obj.id === id;
            });
            setProductDetail(found)
        })
        consultAmount(id)
    }, [id])


    return (

        <div>
            {
                productDetail && (
                    <div className="product-detail">
                        <img src={productDetail.img} className='img-details' />
                        <div className="quantity-product"> <p>{amount !== 0 ? amount : 0}</p> </div>
                        <div className='title'>
                            <span className='name-product'>{productDetail.name}</span> - <span className='price-product'>${productDetail.price}</span>
                            <button className='buttom-more' onClick={() => addToCart(productDetail.id, 1, productDetail.name,productDetail.price, productDetail.img)}>+</button>
                            <button className='buttom-less' onClick={() => removeToCart(productDetail.id)}>-</button>
                        </div>
                        <div className='description'>
                            {productDetail.description}

                        </div>
                    </div>
                )
            }


        </div>



    )
}
