
import { Box, Button, Typography } from '@mui/material';
export const ConfirmModal = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <dialog
      open={open}
      style={{ padding: "20px", borderRadius: "8px", border: "1px solid #ccc" }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography>{content}</Typography>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirm
        </Button>
      </Box>
    </dialog>
  );
};
