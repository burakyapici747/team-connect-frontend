'use client';

import { FormInput } from '@/components/common/FormInput';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const { form, onSubmit } = useRegisterForm();
  const { register, formState: { errors } } = form;

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
                Hesap Oluştur
              </h1>
              <p className="text-gray-600 text-sm">
                Team Connect'e katılmak için hesap oluşturun
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              <FormInput
                label="Email"
                type="email"
                placeholder="ornek@sirket.com"
                error={errors.email?.message}
                registration={register('email')}
              />

              <FormInput
                label="Kullanıcı Adı"
                type="text"
                placeholder="kullaniciadi"
                error={errors.fullName?.message}
                registration={register('fullName')}
              />

              <FormInput
                label="Şifre"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                registration={register('password')}
              />

              <FormInput
                label="Şifre Tekrar"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                registration={register('confirmPassword')}
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none"
                >
                  Kayıt Ol
                </button>
              </div>
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
            <div>
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
                <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">
                  Google ile devam et
                </span>
              </button>
            </div>

            {/* Terms & Login Link */}
            <div className="space-y-4 text-center">
              <p className="text-gray-500 text-xs">
                Kayıt olarak{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Kullanım Koşulları
                </Link>
                {' '}ve{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Gizlilik Politikası
                </Link>
                'nı kabul etmiş olursunuz
              </p>

              <p className="text-sm text-gray-600">
                Zaten hesabın var mı?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Giriş yap
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 