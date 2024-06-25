import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface MessageProps {
  message: string;
  onClose: () => void;
  open: boolean;
  type: 'success' | 'error' | 'info';
}

const Message: React.FC<MessageProps> = ({ message, onClose, open, type }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor: type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#2196f3' }}
        message={message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default Message;
