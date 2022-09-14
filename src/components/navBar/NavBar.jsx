import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Box from '@mui/material/Box';
import ButtonTheme from './ButtonTheme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cart from '../cartWidget/Cart';
import './navBar.scss';
const imgLogo = {
    alt: 'Imagen Logo',
    imgUrl: '/imagesNav/simboloArbol.svg'
}


const NavBar = ({ setDark, checked }) => {
    const [navBarOptions, setNavBarOptions] = useState([]);
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
    console.log(user)

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
            <nav className="navbar navbar-expand-lg d-flex flex-nowrap navbar-dark">
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
                                <Link to={'#'} className="linkNav active m-2 text-white">Brands</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={'#'} className="linkNav dropdown-toggle active m-2 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {navBarOptions.map(({ route, category }) => {
                                        return <Link to={route} key={category.toString()} className="dropdown-item">{category}</Link>
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={'/orders'} className="linkNav active m-2 text-white">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/favorites'} className="linkNav active m-2 text-white">Favorites</Link>
                            </li>
                        </ul>
                    </div>
                </div><div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            isAuthenticated ?
                                <img className='userImg' src={user.picture} alt="" /> :
                                <AccountCircleIcon sx={{ color: 'white' }} />
                        }
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            isAuthenticated ?
                                <>
                                    <li className="dropdown-item userLink">Your Profile</li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li className="dropdown-item userLink">Settings</li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li className="dropdown-item userLink" onClick={() => logout()}>Sign Out</li>
                                </> :
                                <li className="dropdown-item userLink" onClick={() => loginWithRedirect()} >Login</li>
                        }
                    </ul>
                </div>
                <ButtonTheme setDark={setDark} checked={checked} />
                <Cart />

            </nav>
        </Box>
    );
}

export default NavBar;