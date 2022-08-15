import { useOrderContext } from "./context/OrdersContext";
import { Link } from "react-router-dom";

const Orders = () => {
    const { orderData, orderItems } = useOrderContext();
    return orderItems.length === 0 ?
        <div className="text-center">
            <h1 className="mt-5">You haven`t orders...</h1>
            <Link to={'/'}><button className="mt-5 bg-dark text-white bgHover rounded">Back to Home</button></Link>
        </div> :
        <div className="">
            <table className="table text-center container-fluid">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Number of order</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map(({ name, price, quantity }) => {
                        return <tr>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>{quantity}</td>
                            <td>{orderData}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
}

export default Orders;