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
} from '@mui/material';


const AvailableAddress = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/scan', {
        params: { start_ip: '192.168.10.100', end_ip: '192.168.10.130' },
      });
      setData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Available Address Scanner
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan IP Range'}
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

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
