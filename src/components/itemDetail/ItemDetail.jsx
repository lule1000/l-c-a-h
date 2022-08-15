import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCartContext } from "../context/CartContext";
import { AiFillCheckCircle } from "react-icons/ai"

const ItemDetail = ({ item }) => {
    const { stock, imgUrl, alt, name, description, price, quantity } = item;
    const [amount, setAmount] = useState(0);
    const { addItem } = useCartContext();
    const onAdd = (amount) => {
        setAmount(amount);
        addItem(item, quantity * amount);
    }

    return (
        <div className="border border-3 row g-0 m-5">
            <div className="col-md-4">
                <img src={imgUrl} className="img-fluid rounded-start border-end" alt={alt} />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <h5>Description</h5>
                    <p className="card-text">{description}</p>
                    <h3 className="card-text"><b>${price}</b></h3>
                    <p className="card-text"><b>Stock  ({stock} available)</b></p>
                    {amount === 0 ? <ItemCount stock={stock} onAdd={onAdd} /> : <>
                        <h5><AiFillCheckCircle className="bgColor"/> {amount} products have been added to the cart</h5>
                        <Link to={'/cart'}><button className="bg-primary text-white rounded btnQuantiti">Go to Checkout</button></Link>
                    </>}
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;