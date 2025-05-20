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
  FormHelperText,
  FormControl
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuthContext from '../../Context/AuthContext';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { TokenSave, getUser } = useAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
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
      // send the raw data object, not { data }
      const resp = await axiosInstance.post('/sign-in', data);
      TokenSave('access_token', resp.data.token);
      await getUser();
      navigate(-1);
    } catch (err) {
      // assume your backend returns { errors: { email: "...", password: "..." } }
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
        alignItems: 'center',
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
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Please enter your details to sign in
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'grid', gap: 3 }}
          >
            {/* Email */}
            <FormControl fullWidth error={Boolean(errors.email)}>
              <TextField
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                variant="outlined"
                size="medium"
                value={data.password}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => setShowPwd(v => !v)}
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>

            {/* Submit */}
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
                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' },
              }}
            >
              {loading ? 'Signing in…' : 'Login'}
            </Button>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Don’t have an account?{' '}
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/sign-up')}
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
