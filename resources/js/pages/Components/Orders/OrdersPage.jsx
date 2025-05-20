// src/pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError('');
      try {
        const res = await axiosInstance.get('/user-orders');
        // assume { status: 200, data: [...] }
        setOrders(res.data.data);
      } catch (err) {
        setError('Failed to load orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

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

  if (orders.length === 0) {
    return <Typography>No past orders found.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Paper variant="outlined">
        <List>
          {orders.map(order => (
            <ListItemButton
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <ListItemText
                primary={`Order #${order.id}`}
                secondary={`Placed on ${new Date(order.created_at).toLocaleDateString()}\nTotal: $${order.total.toFixed(2)}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
