import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
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
          {tr('filter.title')}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          <TextField fullWidth label={tr('filter.search')} value={search} onChange={(event) => setSearch(event.target.value)} />
          <TextField fullWidth select label={tr('filter.status')} value={status} onChange={(event) => setStatus(event.target.value as ProductStatus | 'all')}>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value === 'active' ? tr('filter.active_only') : option.value === 'inactive' ? tr('filter.inactive_only') : tr('filter.all')}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth select label={tr('filter.category')} value={category} onChange={(event) => setCategory(event.target.value)}>
            <MenuItem value="">{tr('filter.all_categories')}</MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth select label={tr('filter.price_range')} value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
            <MenuItem value="">{tr('filter.all_price_ranges')}</MenuItem>
            {priceRangeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value === 'under-500k' ? tr('filter.under_500k') : option.value === '500k-1m' ? tr('filter.500k_1m') : tr('filter.over_1m')}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label={tr('filter.min_price')} type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} />
          <TextField fullWidth label={tr('filter.max_price')} type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button variant="contained" startIcon={<SearchOutlinedIcon />} onClick={handleApply}>
            {tr('filter.apply')}
          </Button>
          <Button variant="outlined" startIcon={<RestartAltOutlinedIcon />} onClick={handleReset}>
            {tr('filter.reset')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProductFilterBar;