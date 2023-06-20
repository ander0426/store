import { types } from '../types/types'

export const addCart = (product:object) => ({
        type: types.addProductCart,
        payload: product 
})

export const removeCart = (id:number) => ({
    type: types.removeProductCart,
    payload: id 
})

export const clearCart = () => ({
    type: types.clearCart,
})
