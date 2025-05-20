import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  FormControl,
  FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuthContext from '../../Context/AuthContext';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const { TokenSave, getUser } = useAuthContext();
  const navigate = useNavigate();

  // form state
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // show/hide password
  const [showPwd, setShowPwd] = useState(false);

  // loading & errors
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setData(d => ({ ...d, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      // your backend signup endpoint
      const resp = await axiosInstance.post('/sign-up', data);
      // assume it returns { token: '...' }
      TokenSave('access_token', resp.data.token);
      await getUser();
      navigate('/'); // or wherever
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 2 }} elevation={1}>
        <CardContent sx={{ px: 4, py: 6 }}>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Create an account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Fill in your details below
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'grid', gap: 3 }}
          >
            {/* Name */}
            <FormControl fullWidth error={Boolean(errors.name)}>
              <TextField
                name="name"
                placeholder="Your full name"
                variant="outlined"
                size="medium"
                value={data.name}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.name && (
                <FormHelperText>{errors.name}</FormHelperText>
              )}
            </FormControl>

            {/* Email */}
            <FormControl fullWidth error={Boolean(errors.email)}>
              <TextField
                name="email"
                placeholder="you@example.com"
                variant="outlined"
                size="medium"
                value={data.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && (
                <FormHelperText>{errors.email}</FormHelperText>
              )}
            </FormControl>

            {/* Password */}
            <FormControl fullWidth error={Boolean(errors.password)}>
              <TextField
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Create a password"
                variant="outlined"
                size="medium"
                value={data.password}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd(v => !v)}
                        edge="end"
                        size="small"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl fullWidth error={Boolean(errors.password_confirmation)}>
              <TextField
                name="password_confirmation"
                type={showPwd ? 'text' : 'password'}
                placeholder="Confirm your password"
                variant="outlined"
                size="medium"
                value={data.password_confirmation}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd(v => !v)}
                        edge="end"
                        size="small"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors.password_confirmation && (
                <FormHelperText>{errors.password_confirmation}</FormHelperText>
              )}
            </FormControl>

            {/* Signup button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: 'black',
                color: 'white',
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }
              }}
            >
              {loading ? 'Signing up…' : 'Sign Up'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
