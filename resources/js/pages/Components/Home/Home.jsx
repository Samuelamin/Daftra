// src/pages/ProductsSearchPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Pagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import axiosInstance from '../../../api/axios';
import useAuthContext from '../../../Context/AuthContext';
import FilterDrawer from './FilterDrawer';
import ProductCard from './ProductCard';
import ProductDetailsDrawer from './ProductDetailsDrawer';
import { useNavigate } from 'react-router';

const Hone = () =>{
  const {
    itemsArray,
    subtotal,
    shipping,
    tax,
    total,
    updateItem,
    removeItem
  } = useAuthContext();
  const navigate = useNavigate();
  // drawers
  const [filterOpen, setFilterOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // filters & search
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  // product data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false);

  // details drawer
  const [activeProduct, setActiveProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        page,
        per_page: perPage,
        min_price: priceRange[0],
        max_price: priceRange[1],
        ...(selectedCat != null && { category_id: selectedCat }),
        ...(searchTerm && { search: searchTerm }),
      };
      // note: posting to '/products' per your setup
      const res = await axiosInstance.post('/products', payload);
      const { data: items, categories: cats, meta: m } = res.data;
      setProducts(items);
      setCategories(cats);
      setMeta(m);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, priceRange, selectedCat, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleApply = () => {
    setPage(1);
    setFilterOpen(false);
  };
  const handleClear = () => {
    setSelectedCat(null);
    setPriceRange([0, 300]);
    setPage(1);
    setFilterOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* LEFT: Order Summary */}


        {/* RIGHT: Search + Products */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              placeholder="Search by product name"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setPage(1)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <IconButton onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Typography align="center">No products found.</Typography>
          ) : (
            <>
              <Grid container spacing={3} justifyContent="center">
                {products.map(prod => (
                  <Grid key={prod.id} size={{ xs: 6, md: 4 }}>

                    <ProductCard
                      product={prod}
                      onViewDetails={p => {
                        setActiveProduct(p);
                        setDetailsOpen(true);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              {meta.last_page > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={meta.last_page}
                    page={page}
                    onChange={(_, v) => setPage(v)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
        {itemsArray.length > 0 && (

          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper sx={{ p: 2, mb: 3 }}>

            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            {itemsArray.map(({ product, count }) => (
              <Paper
                key={product.id}
                variant="outlined"
                sx={{
                  mb: 2,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Top: image + name + price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 56, height: 56, objectFit: 'contain' }}
                  />
                  <Box>
                    <Typography noWrap>{product.name}</Typography>
                    <Typography variant="body2">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Bottom: quantity + remove */}
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
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
              </Paper>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Shipping: ${shipping.toFixed(2)}</Typography>
            <Typography>Tax: ${tax.toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button onClick={(e)=>navigate('/cart')} fullWidth variant="contained" sx={{ mt: 2 , bgcolor: 'black' , color: 'white' }}>
              Proceed to Checkout
            </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Drawers */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        selectedCat={selectedCat}
        onSelectCategory={setSelectedCat}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        onApply={handleApply}
        onClear={handleClear}
      />

      <ProductDetailsDrawer
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        product={activeProduct}
      />
    </Box>
  );
}

export default Hone
