// src/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Paper,
  Avatar,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

const RegisterForm = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/register', { first_name, last_name, username, password, role });
      setMessage('Registration successful');
      setSeverity('success');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('Username already exists');
        setSeverity('error');
      } else {
        setMessage('Registration failed: ' + (error.response?.data?.message || error.message));
        setSeverity('error');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, mt: 5, borderRadius: 2, backgroundColor: '#f0f4f8' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="First Name"
                variant="outlined"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Last Name"
                variant="outlined"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth required>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select a Role</em>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select a Role</em>
                  </MenuItem>
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
            >
              Register
            </Button>
            {message && <Alert severity={severity} sx={{ mt: 2 }}>{message}</Alert>}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
