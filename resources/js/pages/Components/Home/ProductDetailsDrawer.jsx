// src/components/ProductDetailsDrawer.jsx
import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuthContext from '../../../Context/AuthContext';

export default function ProductDetailsDrawer({ open, onClose, product }) {
  const { cart, addItem, updateItem, removeItem } = useAuthContext();
  if (!product) return null;

  const count = cart[product.id]?.count || 0;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Product Details</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{ width: '100%', borderRadius: 1, mb: 2, objectFit: 'contain' }}
        />

        {/* Name, Category, Stock */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Category: <strong>{product.category.name}</strong>
          <br />
          Stock: {product.stock}
        </Typography>

        {/* Price */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Quantity controls */}
        {count === 0 ? (
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => addItem(product)}
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                onClick={() => updateItem(product.id, count - 1)}
              >
                −
              </Button>
              <Typography>{count}</Typography>
              <Button
                size="small"
                onClick={() => updateItem(product.id, count + 1)}
              >
                +
              </Button>
            </Box>
            <IconButton
              size="small"
              color="error"
              onClick={() => removeItem(product.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Spacer to push content upwards */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Close / Checkout */}
        <Button variant="outlined" fullWidth onClick={onClose}>
          Done
        </Button>
      </Box>
    </Drawer>
  );
}
