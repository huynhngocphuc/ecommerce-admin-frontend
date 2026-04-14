import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { ProductFilters, ProductStatus } from '../../features/products/type';

interface ProductFilterBarProps {
  filters: ProductFilters;
  onApply: (filters: Partial<ProductFilters>) => void;
  onReset: () => void;
}

const statusOptions: Array<{ label: string; value: ProductStatus | 'all' }> = [
  { label: 'Active only', value: 'active' },
  { label: 'Inactive only', value: 'inactive' },
  { label: 'All', value: 'all' },
];

const categoryOptions = ['electronics', 'fashion', 'home', 'books', 'others'];
const priceRangeOptions = [
  { label: 'Under 500k', value: 'under-500k' },
  { label: '500k - 1m', value: '500k-1m' },
  { label: 'Over 1m', value: 'over-1m' },
];

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ filters, onApply, onReset }) => {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState<ProductStatus | 'all'>(filters.status || 'active');
  const [category, setCategory] = useState(filters.categories?.[0] || '');
  const [priceRange, setPriceRange] = useState(filters.priceRanges?.[0] || '');
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || '');

  useEffect(() => {
    setSearch(filters.search || '');
    setStatus(filters.status || 'active');
    setCategory(filters.categories?.[0] || '');
    setPriceRange(filters.priceRanges?.[0] || '');
    setMinPrice(filters.minPrice?.toString() || '');
    setMaxPrice(filters.maxPrice?.toString() || '');
  }, [filters]);

  const handleApply = () => {
    onApply({
      page: 1,
      search: search.trim() || undefined,
      status,
      categories: category ? [category] : undefined,
      priceRanges: priceRange ? [priceRange] : undefined,
      minPrice: minPrice === '' ? undefined : Number(minPrice),
      maxPrice: maxPrice === '' ? undefined : Number(maxPrice),
    });
  };

  const handleReset = () => {
    setSearch('');
    setStatus('active');
    setCategory('');
    setPriceRange('');
    setMinPrice('');
    setMaxPrice('');
    onReset();
  };

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={800}>
          Filters
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          <TextField fullWidth label="Search by name" value={search} onChange={(event) => setSearch(event.target.value)} />
          <TextField fullWidth select label="Status" value={status} onChange={(event) => setStatus(event.target.value as ProductStatus | 'all')}>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth select label="Category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <MenuItem value="">All categories</MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth select label="Price range" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
            <MenuItem value="">All price ranges</MenuItem>
            {priceRangeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Min price" type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} />
          <TextField fullWidth label="Max price" type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button variant="contained" startIcon={<SearchOutlinedIcon />} onClick={handleApply}>
            Apply filters
          </Button>
          <Button variant="outlined" startIcon={<RestartAltOutlinedIcon />} onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProductFilterBar;