'use client';

import { FormInput } from '@/components/common/FormInput';
import { useForgotPasswordForm } from '@/hooks/useForgotPasswordForm';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, TextField, Typography } from "@mui/material";

export default function ForgotPasswordPage() {
  const { form, onSubmit } = useForgotPasswordForm();
  const { register, formState: { errors }, handleSubmit } = form;

  return (
    <div className="min-h-screen auth-background">
      <div className="min-h-screen flex items-center justify-center p-4 auth-container">
        <div className="w-full max-w-[480px] animate-in">
          <div className="glass-effect rounded-xl p-8 space-y-8">
            {/* Logo ve Başlık */}
            <div className="text-center space-y-3">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src="/logo.svg"
                  alt="Team Connect Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Şifremi Unuttum
              </h1>
              <p className="text-gray-600 text-sm">
                Şifrenizi sıfırlamak için email adresinizi girin
              </p>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <TextField
                {...register("email")}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                className="auth-input"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none"
                >
                  Şifre Sıfırlama Bağlantısı Gönder
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <p className="text-center text-sm text-gray-600">
              Şifrenizi hatırladınız mı?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 