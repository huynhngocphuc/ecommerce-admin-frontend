import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { ProductFormValues } from '../../features/products/type';

interface ProductFormProps {
  values: ProductFormValues;
  errors: Partial<Record<keyof ProductFormValues, string>>;
  onChange: <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => void;
  disabled?: boolean;
}

const CATEGORY_OPTIONS: ProductFormValues['category'][] = ['electronics', 'fashion', 'home', 'books', 'others'];

const ProductForm: React.FC<ProductFormProps> = ({ values, errors, onChange, disabled }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
      <Box>
        <TextField
          fullWidth
          label="Name"
          value={values.name}
          onChange={(event) => onChange('name', event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="SKU"
          value={values.sku || ''}
          onChange={(event) => onChange('sku', event.target.value)}
          error={Boolean(errors.sku)}
          helperText={errors.sku || 'Optional, but must be unique when provided'}
          disabled={disabled}
        />
      </Box>
      <Box sx={{ gridColumn: '1 / -1' }}>
        <TextField
          fullWidth
          label="Description"
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
          error={Boolean(errors.description)}
          helperText={errors.description}
          multiline
          minRows={4}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Image URL"
          value={values.imageUrl || ''}
          onChange={(event) => onChange('imageUrl', event.target.value)}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          select
          label="Category"
          value={values.category}
          onChange={(event) => onChange('category', event.target.value as ProductFormValues['category'])}
          error={Boolean(errors.category)}
          helperText={errors.category}
          disabled={disabled}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Price"
          type="number"
          inputProps={{ min: 0, step: '0.01' }}
          value={values.price}
          onChange={(event) => onChange('price', Number(event.target.value))}
          error={Boolean(errors.price)}
          helperText={errors.price}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Stock"
          type="number"
          inputProps={{ min: 0, step: '1' }}
          value={values.stock}
          onChange={(event) => onChange('stock', Number(event.target.value))}
          error={Boolean(errors.stock)}
          helperText={errors.stock}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Status"
          select
          value={values.isDeleted ? 'inactive' : 'active'}
          onChange={(event) => onChange('isDeleted', event.target.value === 'inactive')}
          helperText="Set to inactive to soft-delete, or active to restore"
          disabled={disabled}
        >
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="inactive">inactive</MenuItem>
        </TextField>
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Brand"
          value={values.brand || ''}
          onChange={(event) => onChange('brand', event.target.value)}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Style"
          value={values.style || ''}
          onChange={(event) => onChange('style', event.target.value)}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Size"
          value={values.size || ''}
          onChange={(event) => onChange('size', event.target.value)}
          disabled={disabled}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Color"
          value={values.color || ''}
          onChange={(event) => onChange('color', event.target.value)}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default ProductForm;