import Item from "./Item";

const ItemList = ({ items, dark }) => {
    return (
        items.map(({id, imgUrl, alt, name, price}) => {
            return <Item key={id} imgUrl={imgUrl} alt={alt} name={name} price={price} id={id} dark={dark} />
        })
    );
}

export default ItemList;