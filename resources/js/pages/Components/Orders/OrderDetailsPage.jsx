// src/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError('');
      try {
        const res = await axiosInstance.get(`/user-orders/${orderId}`);
        setOrder(res.data.data);
      } catch (err) {
        setError('Failed to load order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!order) {
    return <Typography>Order not found.</Typography>;
  }

  // If your backend includes details, it might be order.order_details
  const details = order.order_details || order.details || [];

  return (
    <Box sx={{ p: 2 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back to Orders
      </Button>
      <Typography variant="h4" gutterBottom>
        Order #{order.id}
      </Typography>
      <Typography gutterBottom>
        Placed on {new Date(order.created_at).toLocaleString()}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {details.length > 0 ? (
        <Paper variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Line Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((d, idx) => (
                <TableRow key={idx}>
                  <TableCell>{d.product?.name || d.product_id}</TableCell>
                  <TableCell align="right">{d.quantity || d.count}</TableCell>
                  <TableCell align="right">
                    ${((d.product.price || d.product.price) ?? 0).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${(((d.product.price || d.product.price) ?? 0) * (d.quantity || d.count)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Typography>No line‐item details available.</Typography>
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Order Total: ${order.total.toFixed(2)}</Typography>
    </Box>
  );
}
