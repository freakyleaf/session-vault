import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchWithAuth } from '@backend-src/lib/utils/bxFetchWithAuth';
import { getBaseUrl } from '@backend-src/lib/utils/bxGetBaseUrl';

import { useAuthHeaders } from '@backend-src/hooks/bxUseAuthHeaders';
import { useToast } from '@backend-src/hooks/bxUseToast';

import { ALBUM_QUERY_KEYS } from '@backend-src/lib/queryKeys/bxAlbumQueryKeys';

import type { ICreateUpdateAlbumRequest } from '@shared-src/lib/interfaces';
import type { TId } from '@shared-src/lib/types';

const { baseUrl } = getBaseUrl();

export const useCreateAlbum = () => {
  const getHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: ICreateUpdateAlbumRequest }) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(data),
          headers,
          method: 'POST',
        },
        url: `${baseUrl}/albums/create`,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.all });
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.artist });
    },
  });
};

export const useUpdateAlbum = () => {
  const getHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      _id,
      data,
    }: {
      _id: TId;
      data: ICreateUpdateAlbumRequest;
    }) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(data),
          headers,
          method: 'PUT',
        },
        url: `${baseUrl}/albums/${_id}`,
      });
    },
    onSuccess: (_, { _id }) => {
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.all });
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.artist });
      void queryClient.invalidateQueries({
        queryKey: ALBUM_QUERY_KEYS.single(_id),
      });
    },
  });
};

export const useDeleteAlbum = () => {
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
        url: `${baseUrl}/albums/${_id}`,
      });
    },
    onSuccess: (_, _id) => {
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.all });
      void queryClient.invalidateQueries({ queryKey: ALBUM_QUERY_KEYS.artist });
      void queryClient.removeQueries({
        queryKey: ALBUM_QUERY_KEYS.single(_id),
      });
    },
  });
};

export const useAlbumMutations = () => {
  const { showErrorToast, showSuccessToast } = useToast();

  const createMutation = useCreateAlbum();
  const deleteMutation = useDeleteAlbum();
  const updateMutation = useUpdateAlbum();

  const createAlbum = useCallback(
    async ({ data }: { data: ICreateUpdateAlbumRequest }) => {
      try {
        await createMutation.mutateAsync({ data });
        showSuccessToast('Album created successfully');
      } catch (error) {
        showErrorToast('Failed to create album');
        console.error('Failed to create album:', error);
        throw error;
      }
    },
    [createMutation, showErrorToast, showSuccessToast],
  );

  const deleteAlbum = useCallback(
    async (id: TId) => {
      try {
        await deleteMutation.mutateAsync(id);
        showSuccessToast('Album deleted successfully');
      } catch (error) {
        showErrorToast('Failed to delete album');
        console.error('Failed to delete album:', error);
        throw error;
      }
    },
    [deleteMutation, showErrorToast, showSuccessToast],
  );

  const updateAlbum = useCallback(
    async ({ _id, data }: { _id: TId; data: ICreateUpdateAlbumRequest }) => {
      try {
        await updateMutation.mutateAsync({ _id, data });
        showSuccessToast('Album updated successfully');
      } catch (error) {
        showErrorToast('Failed to update album');
        console.error('Failed to update album:', error);
        throw error;
      }
    },
    [showErrorToast, showSuccessToast, updateMutation],
  );

  return {
    createAlbum,
    createError: createMutation.error,
    deleteAlbum,
    deleteError: deleteMutation.error,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
    updateAlbum,
    updateError: updateMutation.error,
  };
};
