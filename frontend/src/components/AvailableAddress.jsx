import React, { useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Chip,
  Box,
  TextField,  // Import TextField to handle input
} from '@mui/material';

// Define base_url from the environment variable
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const AvailableAddress = () => {
  // State hooks for data, loading, and IP inputs
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIp, setStartIp] = useState('192.168.10.100');  // Default value for start IP
  const [endIp, setEndIp] = useState('192.168.10.130');  // Default value for end IP

  // Fetch data from the backend with the given start_ip and end_ip
  const fetchData = async () => {
    setLoading(true);  // Set loading state to true while fetching
    try {
      // Pass the start_ip and end_ip to the API request as query parameters
      const response = await axios.get(`${baseUrl}/scan`, {
        params: { start_ip: startIp, end_ip: endIp },
      });
      setData(response.data.results);  // Update data state with response from API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);  // Set loading state to false once data is fetched
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
        Available Address Scanner
      </Typography>
      
      {/* Input fields for Start IP and End IP */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Start IP"
          value={startIp}
          onChange={(e) => setStartIp(e.target.value)}
          sx={{
            mr: 2,
            backgroundColor: 'transparent',
            '& .MuiInputBase-root': {
              color: 'white',
              borderColor: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              borderColor: 'white',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            },
          }}
        />
        <TextField
          label="End IP"
          value={endIp}
          onChange={(e) => setEndIp(e.target.value)}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiInputBase-root': {
              color: 'white',
              borderColor: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              borderColor: 'white',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            },
          }}
        />
      </Box>

      {/* Button to trigger scanning */}
      <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan IP Range'}
      </Button>

      {/* Show CircularProgress while loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Table to display results after scan */}
      {!loading && data.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.ip}>
                  <TableCell>{item.ip}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status === 'up' ? 'In Use' : 'Available'}
                      color={item.status === 'up' ? 'error' : 'success'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AvailableAddress;
