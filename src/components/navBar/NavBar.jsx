import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import ButtonTheme from './ButtonTheme';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cart from '../cartWidget/Cart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './navBar.scss';
const imgLogo = {
    alt: 'Imagen Logo',
    imgUrl: '/imagesNav/simboloArbol.svg'
}
const imgLogoNav = {
    alt: 'Imagen Logo',
    imgUrl: '/imagesNav/logoNav.webp'
}

const drawerWidth = 140;

const navItems = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Brands',
        route: '#'
    },
    {
        name: 'Orders',
        route: '/orders'
    },
    {
        name: 'Favorites',
        route: '/favorites'
    }
];

function DrawerAppBar({ window, setDark, checked, dark }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
    const showNavOptions = useMediaQuery('(min-width:600px)');
    const showLogo = useMediaQuery('(max-width:400px)');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <List className='d-flex flex-column'>
                {
                    showLogo &&
                    <Box className='d-flex justify-content-center mb-3'>
                        <Link to={'/'}>
                            <img src={imgLogoNav.imgUrl} alt={imgLogoNav.alt} />
                        </Link>
                    </Box>
                }
                {navItems.map(({ name, route }) => (
                    <ListItem key={name} disablePadding>
                        <ListItemButton className='ms-2' sx={{ textAlign: 'center' }}>
                            {
                                dark ?
                                    <Link className='text-white text-decoration-none' to={route}>{name}</Link> :
                                    <Link className='text-black text-decoration-none' to={route}>{name}</Link>
                            }
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box height={70} >
            <AppBar position="absolute" component="nav">
                <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', backgroundColor: 'darkseagreen' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {
                            !showLogo &&
                            <Link to={'/'} className="a_img m-2">
                                <img className='logo' src={imgLogo.imgUrl} alt={imgLogo.alt} />
                            </Link>
                        }
                        {
                            showNavOptions &&
                            <Box>
                                {navItems.map(({ name, route }) => (
                                    <Button key={name}>
                                        <Link to={route} className='text-white linkNav' >{name}</Link>
                                    </Button>
                                ))}
                            </Box>
                        }
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                        <li className="dropdown-item userLink"><Link to={'/profile'} className='text-decoration-none text-black' >Your Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="dropdown-item userLink" onClick={() => logout()}>Sign Out</li>
                                    </> :
                                    <li className="dropdown-item userLink" onClick={() => loginWithRedirect()}>Login</li>
                            }
                        </ul>

                        <ButtonTheme setDark={setDark} checked={checked} />
                        <Cart />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

export default DrawerAppBar;