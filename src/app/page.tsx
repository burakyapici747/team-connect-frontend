'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Team Connect
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A unified collaboration platform for real-time communication, meetings, and team management.
        </Typography>
        <Stack direction="row" spacing={2} mt={4}>
          <Button
            component={Link}
            href="/chat"
            variant="contained"
            size="large"
          >
            Start Chatting
          </Button>
          <Button
            component={Link}
            href="/meeting"
            variant="outlined"
            size="large"
          >
            Join Meeting
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
