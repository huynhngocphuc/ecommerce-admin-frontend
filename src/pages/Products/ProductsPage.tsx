import React, { useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
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
import { PERMISSIONS } from '../../constants/permissions';

const ProductsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
  const dispatch = useAppDispatch();
  const { items, pagination, filters, loading, isDialogOpen, isDeleteDialogOpen, formMode, selectedProduct } = useSelector((state: RootState) => state.products);
  const { userRoles, userPermissions } = useSelector((state: RootState) => state.auth);

  const isAdminRole = userRoles.includes('admin') || userRoles.includes('superadmin');
  const canCreate = isAdminRole || userPermissions.includes(PERMISSIONS.PRODUCT_CREATE);
  const canEdit = isAdminRole || userPermissions.includes(PERMISSIONS.PRODUCT_UPDATE);
  const canDelete = isAdminRole || userPermissions.includes(PERMISSIONS.PRODUCT_DELETE_SOFT);

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

  const visibleCount = items.length;
  const activeFilterLabel = filters.status === 'active' ? tr('filter.active_only') : filters.status === 'inactive' ? tr('filter.inactive_only') : tr('filter.all');

  return (
    <Box sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Paper sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={3}>
            <Box sx={{ maxWidth: 760 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.16em' }}>
                catalog workspace
              </Typography>
              <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
              {tr('products.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1.25, maxWidth: '62ch' }}>
              {tr('products.subtitle')}
              </Typography>
            </Box>
            <Stack spacing={1.5} alignItems={{ xs: 'flex-start', lg: 'flex-end' }}>
              {canCreate && (
                <Button variant="contained" startIcon={<AddOutlinedIcon />} onClick={handleCreate}>
                  {tr('products.create')}
                </Button>
              )}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                  gap: 1,
                  width: '100%',
                }}
              >
                <Paper sx={{ p: 1.5, borderRadius: 3, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    visible rows
                  </Typography>
                  <Typography variant="h6">{visibleCount}</Typography>
                </Paper>
                <Paper sx={{ p: 1.5, borderRadius: 3, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    current page
                  </Typography>
                  <Typography variant="h6">{pagination.page}</Typography>
                </Paper>
                <Paper sx={{ p: 1.5, borderRadius: 3, minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    filter
                  </Typography>
                  <Typography variant="h6" noWrap>
                    {activeFilterLabel}
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Stack>
        </Paper>

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
          canEdit={canEdit}
          canDelete={canDelete}
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