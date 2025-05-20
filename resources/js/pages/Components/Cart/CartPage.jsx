// src/pages/CartPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuthContext from '../../../Context/AuthContext';
import axiosInstance from '../../../api/axios';

const CartPage = () =>  {
  const {
    itemsArray,
    subtotal,
    shipping,
    tax,
    total,
    updateItem,
    clearCart,
    removeItem,
    user
  } = useAuthContext();

  const [orderErrors, setOrderErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  const orderNumber = 123;
  const orderDate = new Date().toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handlePlaceOrder = async e => {
    e.preventDefault();
    setGlobalError('');
    setOrderErrors({});
    if(!user || user === 0){
      setGlobalError('You must be logged in to place an order.');
      return;
    }

    const items = itemsArray
      .filter(({ count }) => count > 0)
      .map(({ product, count }) => ({
        item_id: product.id,
        count
      }));

    if (items.length === 0) {
      setGlobalError('Your cart is empty or all quantities are zero.');
      return;
    }

    try {
      const res = await axiosInstance.post('/user-orders', { items });
      console.log('Order placed:', res.data);
      clearCart()

    } catch (err) {
      if (err.response?.status === 422 && err.response.data.errors) {
        setOrderErrors(err.response.data.errors);
      } else {
        setGlobalError('An unexpected error occurred. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your cart
      </Typography>

      {globalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {globalError}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* ── LEFT: Cart Items ── */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            {itemsArray.length === 0 ? (
              <Typography>Your cart is empty.</Typography>
            ) : (
              itemsArray.map(({ product, count }, idx) => (
                <Box key={product.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: 'contain',
                        borderRadius: 1
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price.toFixed(2)} ·{' '}
                        <strong>{product.category.name}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Stock: {product.stock}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 1
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            updateItem(product.id, count - 1)
                          }
                        >
                          −
                        </Button>
                        <Typography>{count}</Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            updateItem(product.id, count + 1)
                          }
                        >
                          +
                        </Button>
                      </Box>

                      {/* Inline per‐item error */}
                      {orderErrors[`items.${idx}.count`] && (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          {orderErrors[`items.${idx}.count`]}
                        </Typography>
                      )}
                    </Box>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeItem(product.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {idx < itemsArray.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))
            )}
          </Paper>
        </Grid>

        {/* ── RIGHT: Order Summary ── */}
        <Grid  size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6">Order Summary</Typography>
              <Typography variant="body2" color="primary">
                #{orderNumber}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'right', mb: 2 }}
            >
              {orderDate}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Subtotal<span>${subtotal.toFixed(2)}</span>
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Shipping<span>${shipping.toFixed(2)}</span>
            </Typography>
            <Typography
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              Tax<span>${tax.toFixed(2)}</span>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              Total<span>${total.toFixed(2)}</span>
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={handlePlaceOrder}
              sx={{
                mt: 2,
                textTransform: 'none',
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }
              }}
            >
              Place the order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage
