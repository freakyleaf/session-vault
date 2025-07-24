import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchWithAuth } from '@backend-src/lib/utils/bxFetchWithAuth';
import { getBaseUrl } from '@backend-src/lib/utils/bxGetBaseUrl';

import { useAuthHeaders } from '@backend-src/hooks/bxUseAuthHeaders';
import { useToast } from '@backend-src/hooks/bxUseToast';

import { ARTIST_QUERY_KEYS } from '@backend-src/lib/queryKeys/bxArtistQueryKeys';

import type { ICreateUpdateArtistRequest } from '@shared-src/lib/interfaces';
import type { TId } from '@shared-src/lib/types';

const { baseUrl } = getBaseUrl();

export const useCreateArtist = () => {
  const getHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: ICreateUpdateArtistRequest }) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(data),
          headers,
          method: 'POST',
        },
        url: `${baseUrl}/artists/create`,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ARTIST_QUERY_KEYS.all });
    },
  });
};

export const useUpdateArtist = () => {
  const getHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      _id,
      data,
    }: {
      _id: TId;
      data: ICreateUpdateArtistRequest;
    }) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(data),
          headers,
          method: 'PUT',
        },
        url: `${baseUrl}/artists/${_id}`,
      });
    },
    onSuccess: (_, { _id }) => {
      void queryClient.invalidateQueries({ queryKey: ARTIST_QUERY_KEYS.all });
      void queryClient.invalidateQueries({
        queryKey: ARTIST_QUERY_KEYS.single(_id),
      });
    },
  });
};

export const useDeleteArtist = () => {
  const getHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_id: TId) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          headers,
          method: 'DELETE',
        },
        url: `${baseUrl}/artists/${_id}`,
      });
    },
    onSuccess: (_, _id) => {
      void queryClient.invalidateQueries({ queryKey: ARTIST_QUERY_KEYS.all });
      void queryClient.removeQueries({
        queryKey: ARTIST_QUERY_KEYS.single(_id),
      });
    },
  });
};

export const useArtistMutations = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const createMutation = useCreateArtist();
  const deleteMutation = useDeleteArtist();
  const updateMutation = useUpdateArtist();

  const createArtist = useCallback(
    async ({ data }: { data: ICreateUpdateArtistRequest }) => {
      try {
        await createMutation.mutateAsync({ data });
        showSuccessToast('Artist created successfully');
      } catch (error) {
        showErrorToast('Failed to create artist');
        console.error('Failed to create artist:', error);
        throw error;
      }
    },
    [createMutation, showErrorToast, showSuccessToast],
  );

  const deleteArtist = useCallback(
    async (_id: TId) => {
      try {
        await deleteMutation.mutateAsync(_id);
        showSuccessToast('Artist deleted successfully');
      } catch (error) {
        showErrorToast('Failed to delete artist');
        console.error('Failed to delete artist:', error);
        throw error;
      }
    },
    [deleteMutation, showErrorToast, showSuccessToast],
  );

  const updateArtist = useCallback(
    async ({ _id, data }: { _id: TId; data: ICreateUpdateArtistRequest }) => {
      try {
        await updateMutation.mutateAsync({ _id, data });
        showSuccessToast('Artist updated successfully');
      } catch (error) {
        showErrorToast('Failed to update artist');
        console.error('Failed to update artist:', error);
        throw error;
      }
    },
    [showErrorToast, showSuccessToast, updateMutation],
  );

  return {
    createArtist,
    createError: createMutation.error,
    deleteArtist,
    deleteError: deleteMutation.error,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
    updateArtist,
    updateError: updateMutation.error,
  };
};
