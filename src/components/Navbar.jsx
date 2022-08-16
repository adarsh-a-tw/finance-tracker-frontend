import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const pages = [{ page: 'Record Books', link: '/record_books' }];


const Navbar = ({ logout }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        logout(); 
        navigate("/");
    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AccountBalanceWalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Finance Tracker
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page_and_link) => {
                                const { page, link } = page_and_link;
                                return <MenuItem key={page} >
                                    <Link to={link}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>
                    <AccountBalanceWalletIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Finance Tracker
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {pages.map((page_and_link) => {
                            const { page, link } = page_and_link;
                            return <Link
                                key={page}
                                to={link}
                                style={{ textDecoration: 'none', color: 'white', display: 'block' }}
                            >
                                {page}
                            </Link>
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button style={{ color: "white" }} onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
