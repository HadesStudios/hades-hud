import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuItem, Select, Box, Paper, Typography } from '@mui/material';

const positions = [
  { id: 'top-center', label: 'Top Center' },
  { id: 'center-top', label: 'Top Center (alt)' },
  { id: 'bottom-center', label: 'Bottom Center' },
  { id: 'bottom-right', label: 'Bottom Right' },
];

const statusStyles = [
  { id: 'old', label: 'Old' },
  { id: 'new', label: 'New' },
];

export default function HudMenu() {
  const dispatch = useDispatch();
  const currentStatusStyle = useSelector((state) => state.hud.config.statusStyle || 'old');
  
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('bottom-center');
  const [statusStyle, setStatusStyle] = useState(currentStatusStyle);

  useEffect(() => {
    setStatusStyle(currentStatusStyle);
  }, [currentStatusStyle]);

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
    // Update Redux store immediately
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        config: {
          statusStyle: statusStyle
        }
      }
    });

    fetch(`https://${GetParentResourceName()}/SaveHudPosition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ position, statusStyle }),
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
    <Paper style={{ position: 'absolute', left: '50%', top: '30%', transform: 'translateX(-50%)', padding: 16, zIndex: 9999 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">HUD Settings</Typography>
        
        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>HUD Position</Typography>
          <Select fullWidth value={position} onChange={(e) => setPosition(e.target.value)}>
            {positions.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>
            ))}
          </Select>
        </Box>
        
        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>Status Icons Style</Typography>
          <Select fullWidth value={statusStyle} onChange={(e) => setStatusStyle(e.target.value)}>
            {statusStyles.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.label}</MenuItem>
            ))}
          </Select>
        </Box>
        
        <Box display="flex" gap={1} sx={{ mt: 1 }}>
          <Button fullWidth variant="contained" color="primary" onClick={save}>Save</Button>
          <Button fullWidth variant="outlined" onClick={close}>Close</Button>
        </Box>
      </Box>
    </Paper>
  );
}
