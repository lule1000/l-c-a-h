import { Link } from "react-router-dom";

const Item = ({ imgUrl, alt, name, price, id }) => {
    return (
            <Link to={`item/${id}`} className="card border-3 m-2 text-decoration-none text-dark">
                <img src={imgUrl} className="card-img-top border-bottom" alt={alt} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p><b>${price}</b></p>
                </div>
            </Link>
    );
}

export default Item;