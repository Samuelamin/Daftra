// src/components/HeaderLayout.jsx
import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const navItems = ['Products' ,'Orders'];

export default function HeaderLayout() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(o => !o);

  // User menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = e => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', px: 2, py: 1 }}>
      <Typography variant="h6" sx={{ my: 2 }}>iZam</Typography>
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => navigate(`/${item.toLowerCase()}`)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="static" sx={{ bgcolor: 'white', py: 2 }} elevation={0}>
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ color: 'black', mr: 3, flexShrink: 0, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            iZam
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navItems.map(item => (
              <Button
                key={item}
                sx={{ color: 'black', textTransform: 'none' }}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Icon */}
          <IconButton
            onClick={() => navigate('/cart')}
            sx={{ color: 'black', mr: 1 }}
          >
            <ShoppingCartIcon />
          </IconButton>

          {/* Login or User Menu */}
          {user ? (
            <>
              <Button
                onClick={handleMenuOpen}
                sx={{ textTransform: 'none', color: 'black', mr: 2 }}
              >
                {user.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                    logout();
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={() => navigate('/sign-in')}
              sx={{
                bgcolor: 'black',
                color: 'white',
                px: 3,
                py: 1,
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: 240 }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
