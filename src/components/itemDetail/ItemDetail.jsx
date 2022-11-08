import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useFavoriteContext } from "../context/FavoriteContext";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ItemCount from "./ItemCount";

const ItemDetail = ({ item }) => {
    const { stock, imgUrl, alt, name, description, price, quantity } = item;
    const [amount, setAmount] = useState(0);
    const { addItem } = useCartContext();
    const { addFavorite } = useFavoriteContext();
    const { isAuthenticated } = useAuth0();
    const dFlex = useMediaQuery('(min-width:600px)');

    const onAdd = (amount) => {
        setAmount(amount);
        addItem(item, quantity * amount);
    }

    const onAddFavorite = () => {
        addFavorite(item)
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Box className="border border-3 m-5" sx={dFlex ? { display: 'flex' } : { display: 'flex', flexDirection: 'column' }}>
            {
                dFlex ?
                    <div className="border-end">
                        <img src={imgUrl} className="img-fluid rounded-start" alt={alt} />
                    </div> :
                    <div className="border-bottom d-flex justify-content-center">
                        <img src={imgUrl} className="img-fluid rounded-start" alt={alt} />
                    </div>
            }
            <div className="">
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <h5>Description</h5>
                    <p className="card-text">{description}</p>
                    <h3 className="card-text"><b>${price}</b></h3>
                    <p className="card-text"><b>Stock  ({stock} available)</b></p>
                    {/* {
                        isAuthenticated ?
                            amount === 0 ?
                                <ItemCount stock={stock} onAdd={onAdd} /> :
                                <>
                                    <h5><AiFillCheckCircle className="bgColor" /> {amount} products have been added to the cart</h5>
                                    <Link to={'/cart'}><button className="bg-primary text-white rounded btnQuantiti">Go to Checkout</button></Link>
                                </> :
                            <>
                                <h3>You must be logged in if you want to buy</h3>
                            </>
                    } */}
                    {
                        amount === 0 ?
                            <ItemCount stock={stock} onAdd={onAdd} /> :
                            <>
                                <h5><AiFillCheckCircle className="bgColor" /> {amount} products have been added to the cart</h5>
                                <Link to={'/cart'}><button className="bg-primary text-white rounded btnQuantiti">Go to Checkout</button></Link>
                            </>
                    }
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={onAddFavorite} />
                </div>
            </div>
        </Box>
    );
}

export default ItemDetail;