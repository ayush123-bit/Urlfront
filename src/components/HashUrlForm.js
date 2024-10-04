import React, { useState } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';

// MUI Components
import { TextField, Button, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link'; // Icon for the button
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Icon for the copy button

const HashUrlForm = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashedUrl, setHashedUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setHashedUrl('');

    try {
      const response = await axios.post('http://localhost:5000/hash-url', { url });
      const { hashedUrl } = response.data;

      // Store the hashed URL
      setHashedUrl(`http://localhost:5000/${hashedUrl}`);

      // Show success notification
      Toastify({
        text: `URL hashed successfully: http://localhost:5000/${hashedUrl}`,
        backgroundColor: 'green',
        className: 'info',
      }).showToast();
      
      // Clear the input field
      setUrl('');
    } catch (err) {
      // Show error notification
      Toastify({
        text: 'Error hashing the URL. Please try again.',
        backgroundColor: 'red',
        className: 'error',
      }).showToast();
      
      setError('Error hashing the URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashedUrl);
    Toastify({
      text: 'Hashed URL copied to clipboard!',
      backgroundColor: 'blue',
      className: 'info',
    }).showToast();
  };

  return (
    <Box
      component="div"
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        mt: 4,
        mb: 4,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Hash Your URL
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          required
          value={url}
          onChange={handleChange}
          placeholder="https://example.com"
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LinkIcon />}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Hash URL'}
        </Button>

        {hashedUrl && (
          <Box
            component="div"
            sx={{
              marginTop: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              wordBreak: 'break-all',
            }}
          >
            <Typography variant="body1">{hashedUrl}</Typography>
            <IconButton
              color="primary"
              aria-label="copy to clipboard"
              onClick={handleCopy}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default HashUrlForm;
