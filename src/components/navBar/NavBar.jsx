import './navBar.scss';
import Cart from '../cartWidget/Cart';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Box from '@mui/material/Box';
import ButtonTheme from './ButtonTheme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const imgLogo = {
    alt: 'Imagen Logo',
    imgUrl: '/imagesNav/simboloArbol.svg'
}


const NavBar = ({ setDark, checked }) => {
    const [navBarOptions, setNavBarOptions] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "navBarOptions");
        const navOptionsDocumenst = getDocs(itemsCollection).then((snapshot) => {
            const data = snapshot.docs.map(doc => (
                { id: doc.id, ...doc.data() }));
            setNavBarOptions(data);
        })
    }, []);

    return (
        <Box sx={{ backgroundColor: 'darkseagreen' }}>
            <nav className="navbar navbar-expand-md d-flex flex-nowrap navbar-dark">
                <div className="container-fluid flex-wrap">
                    <Link to={'/'} className="a_img navbar-brand">
                        <img className='logo' src={imgLogo.imgUrl} alt={imgLogo.alt} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="linkNav active m-2 text-white">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'#'} className="linkNav active m-2 text-white">Companys</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={'#'} className="linkNav dropdown-toggle active m-2 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {navBarOptions.map(({ route, category }) => {
                                        return <Link to={route} className="dropdown-item">{category}</Link>
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={'#'} className="linkNav active m-2 text-white">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/orders'} className="linkNav active m-2 text-white">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/favorites'} className="linkNav active m-2 text-white">Favorites</Link>
                            </li>
                        </ul>
                        <div className='d-flex align-items-center me-1'>
                            <Link to={'#'} className='text-white linkNav'>Login/Register</Link>
                            <AccountCircleIcon sx={{ color: 'white' }} />
                        </div>
                    </div>
                </div>
                <ButtonTheme setDark={setDark} checked={checked} />
                <Cart />
            </nav>
        </Box>
    );
}

export default NavBar;