import { useCartContext } from "../context/CartContext";
import './cartWidget.scss'
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems } = useCartContext();
    return cartItems.length === 0 ?
        <svg id="tamañoSvg" viewBox="0 0 202 167.3">
            <path
                d="M156.5,107.5H66.5c-3.4,0-6.3-2.4-7-5.6L45.8,37.2l-12.9-1c-3.9-0.3-6.9-3.7-6.6-7.6c0.3-3.9,3.7-6.9,7.6-6.6l18.3,1.4c3.2,0.2,5.8,2.5,6.4,5.6l13.7,64.2h78.4L161,45.5c0.8-3.9,4.6-6.3,8.5-5.5c3.9,0.8,6.3,4.6,5.5,8.5l-11.5,53.4C162.7,105.1,159.8,107.5,156.5,107.5z" />
            <circle cx="82.1" cy="130.8" r="14.2" />
            <circle cx="142" cy="130.8" r="14.2" />
        </svg> :
        
        <div>
            <Link to={'/cart'} className="text-decoration-none"><span id="cantidadProductos" className="cart-badge bgHover">{cartItems.length}</span></Link>
            <svg id="tamañoSvg" viewBox="0 0 202 167.3">
                <path
                    d="M156.5,107.5H66.5c-3.4,0-6.3-2.4-7-5.6L45.8,37.2l-12.9-1c-3.9-0.3-6.9-3.7-6.6-7.6c0.3-3.9,3.7-6.9,7.6-6.6l18.3,1.4c3.2,0.2,5.8,2.5,6.4,5.6l13.7,64.2h78.4L161,45.5c0.8-3.9,4.6-6.3,8.5-5.5c3.9,0.8,6.3,4.6,5.5,8.5l-11.5,53.4C162.7,105.1,159.8,107.5,156.5,107.5z" />
                <circle cx="82.1" cy="130.8" r="14.2" />
                <circle cx="142" cy="130.8" r="14.2" />
            </svg>
        </div>
}

export default Cart;