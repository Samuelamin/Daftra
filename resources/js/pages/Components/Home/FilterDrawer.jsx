import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FilterDrawer({
  open,
  onClose,
  categories,
  selectedCat,
  onSelectCategory,
  priceRange,
  onPriceChange,
  onApply,
  onClear
}) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Price Slider */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Price</Typography>
          <Slider
            value={priceRange}
            onChange={(_, v) => onPriceChange(v)}
            valueLabelDisplay="auto"
            min={0}
            max={300}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">${priceRange[0]}</Typography>
            <Typography variant="body2">${priceRange[1]}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Single‐select Category */}
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormLabel component="legend">Category</FormLabel>
            <Button size="small" onClick={onClear}>Clear</Button>
          </Box>
          <RadioGroup
            value={selectedCat != null ? String(selectedCat) : ''}
            onChange={e =>
              onSelectCategory(e.target.value ? Number(e.target.value) : null)
            }
          >
            {categories.map(({ id, name }) => (
              <FormControlLabel
                key={id}
                value={String(id)}
                control={<Radio />}
                label={name}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Apply Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => { onApply(); onClose(); }}
        >
          Apply Filter
        </Button>
      </Box>
    </Drawer>
  );
}
