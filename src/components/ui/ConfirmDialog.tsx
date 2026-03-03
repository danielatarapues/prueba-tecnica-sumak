"use client";

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button 
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  description 
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={onClose} sx={{ color: 'gray', fontWeight: 'bold' }}>
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error" 
          sx={{ borderRadius: '10px', fontWeight: 'bold', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}