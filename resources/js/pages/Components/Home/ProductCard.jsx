import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useAuthContext from '../../../Context/AuthContext';

export default function ProductCard({ product, onViewDetails }) {
  const { cart, addItem, updateItem, removeItem } = useAuthContext();
  const count = cart[product.id]?.count || 0;
  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <IconButton
        size="small"
        onClick={() => onViewDetails(product)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white'
        }}
      >
        <InfoIcon fontSize="small" />
      </IconButton>

      {/* CardMedia will fetch and display the external image reliably */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          height: 200,            // fixed height
          objectFit: 'contain',   // preserve aspect ratio
          bgcolor: 'grey.100'     // light background if padding shows
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)} · <strong>{product.category.name}</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Stock: {product.stock}
        </Typography>
      </CardContent>


      <Box sx={{ px: 2, pb: 2 }}>
        {count === 0 ? (
          <Button fullWidth size="small" variant="outlined" onClick={() => addItem(product)}>
            + Add
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" onClick={() => updateItem(product.id, count - 1)}>-</Button>
            <Typography>{count}</Typography>
            <Button size="small" onClick={() => updateItem(product.id, count + 1)}>+</Button>
            <Button size="small" color="error" onClick={() => removeItem(product.id)}>
              Remove
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}
