import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { API_ENDPOINTS, buildEndpoint } from '../config/endpoints';

// Query key factory
export const institutionKeys = {
  all: ['institutions'],
  lists: () => [...institutionKeys.all, 'list'],
  list: (filters) => [...institutionKeys.lists(), { filters }],
  details: () => [...institutionKeys.all, 'detail'],
  detail: (id) => [...institutionKeys.details(), id],
};

// Fetch all institutions
export const useInstitutions = (filters = {}) => {
  return useQuery({
    queryKey: institutionKeys.list(filters),
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.INSTITUTIONS.LIST, { params: filters });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Fetch single institution
export const useInstitution = (id) => {
  return useQuery({
    queryKey: institutionKeys.detail(id),
    queryFn: async () => {
      const response = await api.get(buildEndpoint(API_ENDPOINTS.INSTITUTIONS.DETAILS, id));
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Create institution (admin only)
export const useCreateInstitution = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (institutionData) => {
      const response = await api.post(API_ENDPOINTS.INSTITUTIONS.CREATE, institutionData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch institutions
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
};

// Update institution (admin only)
export const useUpdateInstitution = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(buildEndpoint(API_ENDPOINTS.INSTITUTIONS.UPDATE, id), data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the specific institution in cache
      queryClient.setQueryData(
        institutionKeys.detail(variables.id),
        data
      );
      // Invalidate list to ensure consistency
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
};

// Delete institution (admin only)
export const useDeleteInstitution = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(buildEndpoint(API_ENDPOINTS.INSTITUTIONS.DELETE, id));
      return response.data;
    },
    onSuccess: (data, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: institutionKeys.detail(id) });
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
};
