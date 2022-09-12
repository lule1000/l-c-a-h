import React, { useContext, createContext, useState } from "react";

const FavoriteContext = createContext();
export const useFavoriteContext = () => useContext(FavoriteContext)

const FavoriteProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([]);

    const isInFavorite = (id) => favorite.find(product => product.id === id) ? true : false;

    const removeItem = (id) => setFavorite(favorite.filter(product => product.id !== id));

    const addFavorite = (item) => {
        setFavorite([...favorite, { ...item }]);
        if (isInFavorite(item.id)) {
            removeItem(item.id)
        }
    }

    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite, removeItem, addFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export default FavoriteProvider;