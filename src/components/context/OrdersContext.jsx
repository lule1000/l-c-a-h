import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();
export const useOrderContext = () => useContext(OrderContext)

const OrderProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderData, setOrderData] = useState(Number);

    return (
        <OrderContext.Provider value={{ orderItems, setOrderItems, orderData, setOrderData }}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;