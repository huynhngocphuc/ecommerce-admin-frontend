import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Product } from '../../features/products/type';

interface ProductTableProps {
  rows: Product[];
  loading: boolean;
  paginationModel: GridPaginationModel;
  rowCount: number;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const ProductTable: React.FC<ProductTableProps> = ({
  rows,
  loading,
  paginationModel,
  rowCount,
  onPaginationModelChange,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
  const columns: GridColDef<Product>[] = [
    {
      field: 'imageUrl',
      headerName: tr('table.image'),
      width: 96,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          src={params.row.imageUrl}
          alt={params.row.name}
          sx={{ width: 48, height: 48, bgcolor: 'grey.100' }}
        >
          {(params.row.name || 'P').slice(0, 1)}
        </Avatar>
      ),
    },
    {
      field: 'name',
      headerName: tr('table.name'),
      flex: 1.2,
      minWidth: 220,
      renderCell: (params) => (
        <Stack spacing={0.25}>
          <Typography variant="subtitle2" fontWeight={700} noWrap>
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {params.row.description}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'price',
      headerName: tr('table.price'),
      width: 140,
      renderCell: (params) => formatCurrency(Number(params.row.price || 0)),
    },
    {
      field: 'category',
      headerName: tr('table.category'),
      width: 150,
      valueGetter: (_, row) => row.category,
    },
    {
      field: 'stock',
      headerName: tr('table.stock'),
      width: 100,
      valueGetter: (_, row) => row.stock,
    },
    {
      field: 'status',
      headerName: tr('table.status'),
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isDeleted ? tr('table.status.inactive') : tr('table.status.active')}
          color={params.row.isDeleted ? 'default' : 'success'}
          variant={params.row.isDeleted ? 'outlined' : 'filled'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: tr('table.actions'),
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton aria-label="edit product" size="small" onClick={() => onEdit(params.row)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete product" size="small" onClick={() => onDelete(params.row)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id || row.id || row.name}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.50',
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center" spacing={1}>
              <Typography variant="subtitle1" fontWeight={700}>
                {tr('table.no_rows_title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tr('table.no_rows_subtitle')}
              </Typography>
            </Stack>
          ),
        }}
      />
    </Paper>
  );
};

export default ProductTable;