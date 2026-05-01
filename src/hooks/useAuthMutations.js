import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../shared';

export const useAuthMutations = () => {
  const { login, register, verifyOTP } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }) => register(email, password),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }) => verifyOTP(email, otp),
  });

  return { loginMutation, registerMutation, verifyOtpMutation };
};


