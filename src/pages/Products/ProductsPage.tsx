import React, { useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchProducts, setDeleteDialogOpen, setDeleteTarget, setDialogOpen, setFilters, setSelectedProduct } from '../../redux/slices/products.slice';
import ProductTable from '../../components/products/ProductTable';
import { GridPaginationModel } from '@mui/x-data-grid';
import ProductFormDialog from '../../components/products/ProductFormDialog';
import ProductFilterBar from '../../components/products/ProductFilterBar';
import ProductDeleteDialog from '../../components/products/ProductDeleteDialog';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
  const dispatch = useAppDispatch();
  const { items, pagination, filters, loading, isDialogOpen, isDeleteDialogOpen, formMode, selectedProduct } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    dispatch(setFilters({ page: model.page + 1, limit: model.pageSize }));
    dispatch(fetchProducts());
  };

  const handleCreate = () => {
    dispatch(setSelectedProduct(null));
    dispatch(setDialogOpen(true));
  };

  const handleEdit = (product: any) => {
    dispatch(setSelectedProduct(product));
    dispatch(setDialogOpen(true));
  };

  const handleDelete = (product: any) => {
    dispatch(setDeleteTarget(product));
    dispatch(setDeleteDialogOpen(true));
  };

  const handleResetFilters = () => {
    dispatch(setFilters({ page: 1, limit: 10, status: 'active', sortBy: 'createdAt', sortOrder: 'desc' }));
    dispatch(fetchProducts());
  };

  return (
    <Box sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
              {tr('products.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {tr('products.subtitle')}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddOutlinedIcon /> } size="small" color="primary" onClick={handleCreate}>
            {tr('products.create')}
          </Button>
        </Stack>

        <ProductFilterBar
          filters={filters}
          onApply={(nextFilters) => {
            dispatch(setFilters(nextFilters));
            dispatch(fetchProducts());
          }}
          onReset={handleResetFilters}
        />

        <ProductTable
          rows={items}
          loading={loading}
          paginationModel={{ page: Math.max(0, pagination.page - 1), pageSize: pagination.limit }}
          rowCount={pagination.totalItems}
          onPaginationModelChange={handlePaginationModelChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ProductFormDialog open={isDialogOpen} mode={formMode} product={selectedProduct} />
        <ProductDeleteDialog open={isDeleteDialogOpen} />
      </Stack>
    </Box>
  );
};

export default ProductsPage;