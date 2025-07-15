import type { IAlbum } from '@shared-src/lib/interfaces';

interface UseAlbumOperationsProps {
  albumId?: string;
}

export const useAlbumOperations = ({
  albumId,
}: UseAlbumOperationsProps = {}) => {
  const { isAdmin } = useClerkUserRole();
  const { showError, showSuccess } = useToast();

  const {
    data: allAdminAlbumsData,
    error: allAdminAlbumsStateError,
    isLoading: allAdminAlbumsStateLoading,
    refetch: allAdminAlbumsActionRefetch,
  } = useGetAllAdminAlbums(isAdmin);

  const {
    data: allArtistAlbumsData,
    error: allArtistAlbumsStateError,
    isLoading: allArtistAlbumsStateLoading,
    refetch: allArtistAlbumsActionRefetch,
  } = useGetAllArtistAlbums(!isAdmin);

  const {
    data: singleAlbumData,
    error: singleAlbumStateError,
    isLoading: singleAlbumStateLoading,
    refetch: singleAlbumRefetch,
  } = useGetSingleAlbum(albumId!);

  const {
    isPending: singleAlbumStateDeleting,
    mutateAsync: singleAlbumDelete,
  } = useDeleteSingleAlbum();

  const albumQueries = useMemo(
    () => ({
      allAlbumsActionRefetch: isAdmin
        ? allAdminAlbumsActionRefetch
        : allArtistAlbumsActionRefetch,
      allAlbumsData: (isAdmin
        ? allAdminAlbumsData
        : allArtistAlbumsData) as IAlbum[],
      allAlbumsStateError: isAdmin
        ? allAdminAlbumsStateError
        : allArtistAlbumsStateError,
      allAlbumsStateLoading: isAdmin
        ? allAdminAlbumsStateLoading
        : allArtistAlbumsStateLoading,
    }),
    [
      allAdminAlbumsActionRefetch,
      allAdminAlbumsData,
      allAdminAlbumsStateError,
      allAdminAlbumsStateLoading,
      allArtistAlbumsActionRefetch,
      allArtistAlbumsData,
      allArtistAlbumsStateError,
      allArtistAlbumsStateLoading,
      isAdmin,
    ],
  );

  const handleAllAlbumsActionRefetch = useCallback(async () => {
    try {
      await albumQueries.allAlbumsActionRefetch();
    } catch (error) {
      console.error('Failed to load albums:', error);
      showError('Failed to load albums');
    }
  }, [albumQueries, showError]);

  const handleSingleAlbumActionDelete = useCallback(
    async (album: IAlbum) => {
      if (!album?._id) {
        showError('Invalid album data');
        return;
      }

      try {
        await singleAlbumDelete(album._id);
        await handleAllAlbumsActionRefetch();
        showSuccess('Album deleted successfully');
      } catch (error) {
        console.error('Failed to delete album:', error);
        showError('Failed to delete album');
      }
    },
    [handleAllAlbumsActionRefetch, showError, showSuccess, singleAlbumDelete],
  );

  const handleSingleAlbumActionRefetch = useCallback(async () => {
    if (!albumId) {
      showError('No album ID provided');
      return;
    }

    try {
      await singleAlbumRefetch();
    } catch (error) {
      console.error('Failed to load album:', error);
      showError('Failed to load album');
    }
  }, [albumId, showError, singleAlbumRefetch]);

  const handleSingleAlbumStateError = useCallback(
    (isEdit: boolean) => {
      const message = isEdit
        ? 'Failed to update album'
        : 'Failed to create album';
      showError(message);
    },
    [showError],
  );

  const handleSingleAlbumStateSuccess = useCallback(
    async (isEdit: boolean) => {
      const message = isEdit
        ? 'Album updated successfully'
        : 'Album created successfully';
      showSuccess(message);
      await handleAllAlbumsActionRefetch();
    },
    [handleAllAlbumsActionRefetch, showSuccess],
  );

  return useMemo(
    () => ({
      allAlbumsData: albumQueries.allAlbumsData,
      allAlbumsStateError: albumQueries.allAlbumsStateError,
      allAlbumsStateLoading: albumQueries.allAlbumsStateLoading,
      handleAllAlbumsActionRefetch,
      handleSingleAlbumActionDelete,
      handleSingleAlbumActionRefetch,
      handleSingleAlbumStateError,
      handleSingleAlbumStateSuccess,
      singleAlbumData,
      singleAlbumStateDeleting,
      singleAlbumStateError,
      singleAlbumStateLoading,
    }),
    [
      albumQueries,
      handleAllAlbumsActionRefetch,
      handleSingleAlbumActionDelete,
      handleSingleAlbumActionRefetch,
      handleSingleAlbumStateError,
      handleSingleAlbumStateSuccess,
      singleAlbumData,
      singleAlbumStateDeleting,
      singleAlbumStateError,
      singleAlbumStateLoading,
    ],
  );
};
