import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select, Box, Paper, Typography } from '@mui/material';

const positions = [
  { id: 'top-center', label: 'Top Center' },
  { id: 'center-top', label: 'Top Center (alt)' },
  { id: 'bottom-center', label: 'Bottom Center' },
  { id: 'bottom-right', label: 'Bottom Right' },
];

export default function HudMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('bottom-center');

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  function onMessage(e) {
    const d = e.data;
    if (!d || !d.type) return;
    if (d.type === 'OPEN_HUD_MENU') {
      setOpen(!!d.data.open);
    }
    if (d.type === 'SET_HUD_POSITION') {
      setPosition(d.data.position || 'bottom-center');
    }
  }

  function save() {
    fetch(`https://${GetParentResourceName()}/SaveHudPosition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ position }),
    }).then(() => {
  // inform UI immediately
  document.body.dataset.hudPosition = position;
  window.postMessage({ type: 'SET_HUD_POSITION', data: { position } }, '*');
    });
  }

  function close() {
    fetch(`https://${GetParentResourceName()}/CloseHudMenu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({}),
    }).then(() => setOpen(false));
  }

  if (!open) return null;

  return (
    <Paper style={{ position: 'absolute', left: '50%', top: '30%', transform: 'translateX(-50%)', padding: 12, zIndex: 9999 }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">HUD Menu</Typography>
        <Typography variant="caption">Choose HUD position</Typography>
        <Select value={position} onChange={(e) => setPosition(e.target.value)}>
          {positions.map((p) => (
            <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>
          ))}
        </Select>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="primary" onClick={save}>Save</Button>
          <Button variant="outlined" onClick={close}>Close</Button>
        </Box>
      </Box>
    </Paper>
  );
}
