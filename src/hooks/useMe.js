import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/endpoints';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get(API_ENDPOINTS.USER.ME);
      return res.data;
    },
    staleTime: 60 * 1000,
  });
};


