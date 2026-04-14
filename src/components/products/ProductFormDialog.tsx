import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState } from '../../redux/store';
import { Product, ProductFormValues } from '../../features/products/type';
import { saveProduct, setDialogOpen, setSelectedProduct } from '../../redux/slices/products.slice';
import ProductForm from './ProductForm';

interface ProductFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  product: Product | null;
}

const emptyValues = (): ProductFormValues => ({
  name: '',
  description: '',
  imageUrl: '',
  price: 0,
  category: 'fashion',
  size: '',
  color: '',
  brand: '',
  style: '',
  stock: 0,
  sku: '',
  media: [],
  sizeOptions: [],
  colorOptions: [],
  isDeleted: false,
});

const normalizeValues = (product: Product | null): ProductFormValues => {
  if (!product) {
    return emptyValues();
  }

  return {
    name: product.name || '',
    description: product.description || '',
    imageUrl: product.imageUrl || '',
    price: product.price || 0,
    category: product.category || 'fashion',
    size: product.size || '',
    color: product.color || '',
    brand: product.brand || '',
    style: product.style || '',
    stock: product.stock || 0,
    sku: product.sku || '',
    media: product.media || [],
    sizeOptions: product.sizeOptions || [],
    colorOptions: product.colorOptions || [],
    isDeleted: Boolean(product.isDeleted),
  };
};

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({ open, mode, product }) => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.products.loading);
  const [values, setValues] = useState<ProductFormValues>(emptyValues());
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({});

  useEffect(() => {
    if (open) {
      setValues(normalizeValues(product));
      setErrors({});
    }
  }, [open, product]);

  const title = useMemo(() => (mode === 'create' ? 'Create Product' : 'Edit Product'), [mode]);

  const handleChange = <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ProductFormValues, string>> = {};

    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!values.description.trim()) nextErrors.description = 'Description is required';
    if (!values.category) nextErrors.category = 'Category is required';
    if (!Number.isFinite(values.price) || values.price < 0) nextErrors.price = 'Price must be at least 0';
    if (!Number.isFinite(values.stock) || values.stock < 0) nextErrors.stock = 'Stock must be at least 0';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleClose = () => {
    dispatch(setDialogOpen(false));
    dispatch(setSelectedProduct(null));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const payload = {
      name: values.name.trim(),
      description: values.description.trim(),
      imageUrl: values.imageUrl?.trim() || undefined,
      price: Number(values.price),
      category: values.category,
      size: values.size?.trim() || undefined,
      color: values.color?.trim() || undefined,
      brand: values.brand?.trim() || undefined,
      style: values.style?.trim() || undefined,
      stock: Number(values.stock),
      sku: values.sku?.trim() || undefined,
      media: values.media,
      sizeOptions: values.sizeOptions,
      colorOptions: values.colorOptions,
      isDeleted: values.isDeleted,
    };

    try {
      await dispatch(
        saveProduct({
          mode,
          id: product?._id || product?.id,
          values: payload,
        })
      ).unwrap();

      handleClose();
    } catch {
      // Errors are surfaced through the global alert stack and inline validation.
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use this modal to create or update product details.
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <ProductForm values={values} errors={errors} onChange={handleChange} disabled={loading} />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;