export function addToCart(payload){
    return {
        type:'ADD_TO_CART',
        payload
    }
}
export function updateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
export function deleteFromCart(payload){
    return{
        type:'DELETE_FROM_CART',
        payload
    }
}