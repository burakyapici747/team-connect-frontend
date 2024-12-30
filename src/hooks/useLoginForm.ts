import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .max(50, 'Şifre en fazla 50 karakter olmalıdır'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push('/chat'); // Başarılı girişten sonra chat sayfasına yönlendir
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'Email veya şifre hatalı',
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}; 