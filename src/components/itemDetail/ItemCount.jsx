import { useState } from "react";

const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1);

    const cantidadProducto = (cantidad) => {
        if (cantidad === "subtract" && count > 1) {
            setCount(count - 1)
        } else if (cantidad === "add" && count < stock) {
            setCount(count + 1)
        }
    }
    return (<>
        <button className='btnQuantiti me-1 rounded' onClick={() => cantidadProducto("subtract")}>Remove</button>
        {count}
        <button className='btnQuantiti ms-1 rounded' onClick={() => cantidadProducto("add")}>Add</button><br />
        <button className="bg-primary text-white btnQuantiti rounded mt-2" onClick={() => onAdd (count)} type='button'>Add To Cart</button>
    </>);
}

export default ItemCount;