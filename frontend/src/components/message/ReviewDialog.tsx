import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newContent: string) => Promise<void>;
  title: string;
  year: string;
  reviewContent: string;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  onSave,
  title,
  year,
  reviewContent,
}) => {
  const [newContent, setNewContent] = React.useState(reviewContent);

  const handleSave = async () => {
    await onSave(newContent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title} - {year}</DialogTitle>
      <DialogContent>
        <TextField
          label="Review"
          multiline
          rows={4}
          fullWidth
          defaultValue={reviewContent}
          onChange={(e) => setNewContent(e.target.value)}
          sx={{
            marginTop: "10px"
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color="error">
          Close
        </Button>
        <Button variant='outlined' onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
