import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // TODO: Implement forgot password API call
      console.log('Forgot password data:', data);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return { form, onSubmit };
}; 