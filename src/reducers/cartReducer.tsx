import { Item } from '../interfaces/products'
import { types } from '../types/types'
import { AnyAction } from 'redux'

const validateCart = (items: any, payload: any) => {
    const cart = items.map((product: Item) => {
        if (product.id === payload.id) {
            product.quantity = payload.quantity + product.quantity
            product.total = product.price * product.quantity
        }
        return product
    })

    return cart;
}

const validateCartRemove = (items: any, payload: any) => {
    let remove = null //
    let cart = items.map((product: Item, index: number) => {
        if (product.id === payload) {
            product.quantity =  product.quantity - 1
            product.total = product.price * product.quantity
        }
            return product
        
        
    })
    console.log(remove)
     cart = cart.filter(item => item.quantity !== 0)
     console.log(cart)
     
    return cart;
}

const initialState = {

    cart: []
}
export const cartReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case types.addProductCart:

            let found = state.cart.find(({ id }) => id === action.payload.id)
            if (found) {
                let item: Item = found
                const cart = validateCart(state.cart, action.payload)
                return {
                    ...state,
                    cart: [...cart]
                }
            }
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case types.removeProductCart:
            
            let foundRemove = state.cart.find(({ id }) => id === action.payload)
            if (foundRemove) {
                const cart = validateCartRemove(state.cart, action.payload)
                return {
                    ...state,
                    cart: [...cart]
                }
            }
            return {
                ...state,
            }
        case types.clearCart:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}
