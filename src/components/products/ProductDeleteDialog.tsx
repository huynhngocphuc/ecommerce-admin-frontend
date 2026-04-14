import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteProduct, setDeleteDialogOpen, setDeleteTarget } from '../../redux/slices/products.slice';

interface ProductDeleteDialogProps {
  open: boolean;
}

const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({ open }) => {
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
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {target ? `Mark “${target.name}” as inactive?` : 'Mark this product as inactive?'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This is a soft delete. The product will remain in the database and can be reactivated later.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={handleConfirm} disabled={loading}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteDialog;