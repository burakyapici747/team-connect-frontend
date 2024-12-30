'use client';

import { FormInput } from '@/components/common/FormInput';
import { useLoginForm } from '@/hooks/useLoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const { form, onSubmit } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Logo ve Başlık */}
          <div className="text-center space-y-2">
            <div className="relative w-20 h-20 mx-auto">
              <Image
                src="/logo.svg"
                alt="Team Connect Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Team Connect'e Hoş Geldiniz
            </h1>
            <p className="text-gray-500">
              Takımınızla iletişime geçmek için giriş yapın
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              label="Email"
              type="email"
              placeholder="ornek@sirket.com"
              error={errors.email?.message}
              registration={register('email')}
            />

            <FormInput
              label="Şifre"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              registration={register('password')}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Beni hatırla</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Şifremi unuttum
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Giriş Yap
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <button 
              type="button"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Google ile devam et
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Hesabınız yok mu?{' '}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
            >
              Hemen kaydolun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 