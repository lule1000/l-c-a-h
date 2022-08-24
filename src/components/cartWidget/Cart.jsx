import { useCartContext } from "../context/CartContext";
import './cartWidget.scss'
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    const { cartItems } = useCartContext();
    return cartItems.length === 0 ?
        <Link to={'/cart'}><ShoppingCartIcon className="me-2" sx={{ color: 'white' }} /></Link>
        :
        <Link to={'/cart'} className="text-decoration-none d-flex flex-column me-2">
            <p className="cart-badge mb-0 ">{cartItems.length}</p>
            <ShoppingCartIcon sx={{ color: 'white' }} />
        </Link>
}

export default Cart;