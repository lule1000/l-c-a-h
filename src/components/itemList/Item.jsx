import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Item = ({ imgUrl, alt, name, price, id, dark }) => {
    return (
        <Card className='card border-3 m-2' >
            <Link to={`item/${id}`} className='text-decoration-none'>
                <CardMedia className='border-bottom' component="img" height="240" image={imgUrl} alt={alt} />
                <CardHeader sx={dark ? { color: 'white' } : { color: 'black' }} title={name} />
                <CardContent>
                    <Typography sx={dark ? { color: 'white' } : { color: 'black' }} variant="body5">${price}</Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
export default Item;