import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteProduct, setDeleteDialogOpen, setDeleteTarget } from '../../redux/slices/products.slice';

interface ProductDeleteDialogProps {
  open: boolean;
}

const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({ open }) => {
  const { t } = useTranslation('admin');
  const tr = t as unknown as (key: string, options?: Record<string, unknown>) => string;
  const dispatch = useAppDispatch();
  const target = useSelector((state: RootState) => state.products.deleteTarget);
  const loading = useSelector((state: RootState) => state.products.loading);

  const handleClose = () => {
    dispatch(setDeleteDialogOpen(false));
    dispatch(setDeleteTarget(null));
  };

  const handleConfirm = async () => {
    if (!target?._id && !target?.id) {
      return;
    }

    try {
      await dispatch(deleteProduct(target._id || target.id || '')).unwrap();
      handleClose();
    } catch {
      // Errors are surfaced through the alert stack.
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{tr('dialog.confirm_delete')}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {target ? tr('dialog.soft_delete_question', { name: target.name }) : tr('dialog.soft_delete_question_generic')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {tr('dialog.soft_delete_note')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          {tr('dialog.cancel')}
        </Button>
        <Button color="error" variant="contained" onClick={handleConfirm} disabled={loading}>
          {tr('dialog.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteDialog;