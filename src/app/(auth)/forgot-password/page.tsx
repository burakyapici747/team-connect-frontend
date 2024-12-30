'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Link as MuiLink, Container, Paper } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError('');
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'grey.50',
        py: 12,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={2}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {!isSubmitted ? (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Şifremi Unuttum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Email Gönderildi!
              </Typography>
              <Typography variant="body1" paragraph>
                Şifre sıfırlama bağlantısı email adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email gelmediyse spam klasörünü kontrol etmeyi unutmayın.
              </Typography>
            </Box>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              <MuiLink component={Link} href="/login">
                Giriş sayfasına dön
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 