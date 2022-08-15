import React, { createContext, useState, useContext } from "react";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext)


const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCartItems(cartItems.map(product => {
                return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product
            }));
        } else {
            setCartItems([...cartItems, { ...item, quantity }]);
        }
    }

    const isInCart = (id) => cartItems.find(product => product.id === id) ? true : false;

    const clearCart = () => setCartItems([]);

    const removeItem = (id) => setCartItems(cartItems.filter(product => product.id !== id));

    const sendOrder = (totalPrice, buyerData, setOrderData, setOrderItems) => {
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
        const order = {
            items: cartItems,
            total: totalPrice,
            buyer: buyerData,
            date: new Date()
        };
        addDoc(orderCollection, order)
            .then(({ id }) => setOrderData(id), setOrderItems([...cartItems]))
            .catch(err => console.log(err))
            .finally(clearCart)
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addItem,
            isInCart,
            clearCart,
            removeItem,
            sendOrder
        }}>
            {children}
        </CartContext.Provider>);
}

export default CartProvider;