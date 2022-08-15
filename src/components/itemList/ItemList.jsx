import Item from "./Item";

const ItemList = ({ items }) => {
    return (
        items.map(item => {
            return <Item key={item.id} imgUrl={item.imgUrl} alt={item.alt} name={item.name} price={item.price} stock={item.stock} id={item.id} />
        })
    );
}

export default ItemList;