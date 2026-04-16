import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string) => string;
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

  const title = useMemo(() => (mode === 'create' ? tr('dialog.create_title') : tr('dialog.edit_title')), [mode, tr]);

  const handleChange = <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ProductFormValues, string>> = {};

    if (!values.name.trim()) nextErrors.name = tr('validation.name_required');
    if (!values.description.trim()) nextErrors.description = tr('validation.description_required');
    if (!values.category) nextErrors.category = tr('validation.category_required');
    if (!Number.isFinite(values.price) || values.price < 0) nextErrors.price = tr('validation.price_min');
    if (!Number.isFinite(values.stock) || values.stock < 0) nextErrors.stock = tr('validation.stock_min');

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
            {tr('dialog.subtitle')}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <ProductForm values={values} errors={errors} onChange={handleChange} disabled={loading} />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          {tr('dialog.cancel')}
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {tr('dialog.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;