import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AnnouncementBar() {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        bgcolor: 'black',
        color: 'white',
        position: 'relative',
        top: 0,
        left: 0,
        zIndex: theme => theme.zIndex.appBar + 1,
        py: 0.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="body2" component="span">
        Sign up and get 20% off to your first order.&nbsp;
      </Typography>
      <Link
        href="/sign-in"
        underline="always"
        sx={{ color: 'inherit', fontWeight: 500 }}
      >
        Sign Up Now
      </Link>
      <IconButton
        size="small"
        onClick={() => setOpen(false)}
        sx={{ color: 'white', position: 'absolute', right: 8 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
