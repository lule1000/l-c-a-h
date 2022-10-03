import { useFavoriteContext } from "./context/FavoriteContext";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = () => {
    const { favorite, removeItem } = useFavoriteContext()

    return favorite.length === 0 ?
        <div className="text-center">
            <h1 className="mt-5">You haven`t products in favorites...</h1>
            <Link to={'/'}><button className="mt-5 bg-dark text-white bgHover rounded">Back to Home</button></Link>
        </div> :
        <Box className="d-flex flex-column m-2">
            {favorite.map(({ name, imgUrl, id, price }) =>
                <Card sx={{ display: 'flex', margin: 2 }} key={id}>
                    <CardMedia
                        className="border-end"
                        component="img"
                        sx={{ width: 151 }}
                        image={imgUrl}
                        alt={name}
                    />
                    <CardContent >
                        <h3>{name}</h3>
                        <p>${price}</p>
                        <div>
                            <Link to={`/item/${id}`}><button className="bg-dark text-white bgHover rounded">Go to product</button></Link>
                            <DeleteIcon className='ms-2 text-danger bgHover' onClick={() => removeItem(id)} />
                        </div>
                    </CardContent>
                </Card>
            )}
        </Box>
}

export default Favorites;