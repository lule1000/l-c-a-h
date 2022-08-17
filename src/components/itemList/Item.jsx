import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Item = ({ imgUrl, alt, name, price, id }) => {
    return (
        <Card className='card border-3 m-2' >
            <Link to={`item/${id}`} className="">
                <CardMedia className='border-bottom' component="img" height="240" image={imgUrl} alt={alt} />
            </Link>
            <CardHeader title={name} />
            <CardContent>
                <Typography variant="body5">${price}</Typography>
            </CardContent>
        </Card>
    );
}
export default Item;