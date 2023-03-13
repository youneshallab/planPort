import React from "react";
import { Button, DialogActions } from "@mui/material";

export default function InputDateActionBar({ onAccept, onCancel }) {
  return (
    <DialogActions>
      <Button onClick={onCancel}>Annuler</Button>
      <Button onClick={onAccept}>Choisir</Button>
    </DialogActions>
  );
}
