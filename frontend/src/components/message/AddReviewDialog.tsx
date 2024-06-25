import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface AddReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (content: string) => void;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ open, onClose, onConfirm }) => {
  const [reviewContent, setReviewContent] = useState('');

  const handleConfirm = () => {
    onConfirm(reviewContent);
    setReviewContent('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="review"
          label="Review Content"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color="error">
          Cancel
        </Button>
        <Button variant='outlined' onClick={handleConfirm} color="primary">
          Add Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewDialog;
