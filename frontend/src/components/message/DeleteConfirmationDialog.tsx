import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  hasReview: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  hasReview,
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{padding: "30px"}}>
      <DialogTitle>Remove from your library</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove the movie{' '}
          <Typography component="span" fontWeight="bold">
            "{title}"
          </Typography>{' '}
          from your library? {hasReview ? (
            <Typography component="span" fontWeight="bold" color="error">
                It contains a review and you will lose it if you remove.
            </Typography>
          ): ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color="primary">
          <Typography component="span" fontSize="small">Cancel</Typography>
        </Button>
        <Button variant='outlined' onClick={onConfirm} color="error">
          <Typography component="span" fontWeight="bold" fontSize="small">Delete</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
